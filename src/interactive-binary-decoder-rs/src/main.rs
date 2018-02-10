#![feature(proc_macro)]

#[macro_use]
extern crate stdweb;

#[macro_use]
extern crate serde_derive;

use std::f64;
use std::str::FromStr;
use stdweb::unstable::TryInto;
use stdweb::js_export;
use stdweb::web::document;
use stdweb::web::html_element::InputElement;

#[derive(Serialize, Deserialize)]
struct Float64 {
    sign_bit: bool,
    exponent_bits: Vec<bool>,
    exponent_value: i16,
    mantissa_bits: Vec<bool>,
    mantissa_value: u64,
    original_value: f64,
}

js_serializable!(Float64);

impl Float64 {
    fn new(f64_val: f64) -> Float64 {
        let f64_bytes: [u8; 8] = unsafe { std::mem::transmute(f64_val) };

        let exponent_value: i16 = {
            let mut exponent_bytes = [0_u8; 2];
            exponent_bytes[0] = (f64_bytes[7] << 4) | f64_bytes[6] >> 4;
            exponent_bytes[1] = (f64_bytes[7] & 0b0111_1111) >> 4;
            unsafe { std::mem::transmute(exponent_bytes) }
        };

        let mantissa_value: u64 = {
            let mut mantissa_bytes = f64_bytes.clone();
            mantissa_bytes[7] = 0;
            mantissa_bytes[6] = mantissa_bytes[6] & 0b0001_1111;
            unsafe { std::mem::transmute(mantissa_bytes) }
        };

        let sign_bit = to_bit(&f64_bytes, 63);

        let mut exponent_bits = Vec::with_capacity(11);
        for i in 0..11 {
            exponent_bits.push(to_bit(&f64_bytes, 62 - i));
        }

        let mut mantissa_bits = Vec::with_capacity(52);
        for i in 0..52 {
            mantissa_bits.push(to_bit(&f64_bytes, 51 - i));
        }

        Float64 {
            sign_bit,
            exponent_bits,
            exponent_value,
            mantissa_bits,
            mantissa_value,
            original_value: f64_val,
        }
    }
}

fn to_bit(f64_bytes: &[u8], bit_position: usize) -> bool {
    let byte_index = bit_position / 8;
    let internal_bit_position = bit_position % 8;
    f64_bytes[byte_index] & (1 << internal_bit_position) > 0
}

fn main() {
    stdweb::initialize();
    update();
    stdweb::event_loop();
}

fn parse_float(string_val: &str) -> f64 {
    f64::from_str(string_val).unwrap_or(f64::NAN)
}

fn update() {
    let float_input: InputElement = document()
        .get_element_by_id("float-input")
        .unwrap()
        .try_into()
        .unwrap();

    let input_val = float_input.value().into_string().unwrap();
    let parsed_float = parse_float(&input_val);
    let float64 = Float64::new(parsed_float);
    js! {
        update( @{float64} );
    }
}
