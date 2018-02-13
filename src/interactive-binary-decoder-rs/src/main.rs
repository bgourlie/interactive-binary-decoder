#![feature(proc_macro)]

#[macro_use]
extern crate stdweb;

#[macro_use]
extern crate serde_derive;

extern crate serde_json;

use std::collections::BTreeMap;
use std::f64;
use std::str::FromStr;
use stdweb::unstable::{TryFrom, TryInto};
use stdweb::{js_export, Value as JsonValue};
use stdweb::web::document;
use stdweb::web::html_element::InputElement;

#[derive(Serialize, Deserialize)]
struct Float {
    sign_bit: bool,
    exponent_bits: Vec<bool>,
    exponent_value: u16,
    mantissa_bits: Vec<bool>,
    mantissa_value: u64,
    native_value: f64,
    parsed_from: String,
}

js_serializable!(Float);

impl Float {
    fn new(string_representation: &str) -> Float {
        let native_value = f64::from_str(string_representation).unwrap_or(f64::NAN);
        let f64_bytes: [u8; 8] = unsafe { std::mem::transmute(native_value) };

        let exponent_value: u16 = {
            let mut exponent_bytes = [0_u8; 2];
            exponent_bytes[0] = (f64_bytes[7] << 4) | f64_bytes[6] >> 4;
            exponent_bytes[1] = (f64_bytes[7] & 0b0111_1111) >> 4;
            unsafe { std::mem::transmute(exponent_bytes) }
        };

        let mantissa_value: u64 = {
            let mut mantissa_bytes = f64_bytes;
            mantissa_bytes[7] = 0;
            mantissa_bytes[6] &= 0b0001_1111;
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

        Float {
            sign_bit,
            exponent_bits,
            exponent_value,
            mantissa_bits,
            mantissa_value,
            native_value,
            parsed_from: string_representation.to_owned(),
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
    stdweb::event_loop();
}

#[js_export]
fn parse_float(string_val: &str) -> Float {
    Float::new(string_val)
}
