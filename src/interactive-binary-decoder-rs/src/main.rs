#[macro_use]
extern crate stdweb;

#[macro_use]
extern crate serde_derive;

#[macro_use]
extern crate serde_json;

use std::f64;
use std::str::FromStr;
use std::fmt::Write;
use stdweb::unstable::TryInto;
use stdweb::web::{document, IEventTarget};
use stdweb::web::event::KeyupEvent;
use stdweb::web::html_element::InputElement;

// Shamelessly stolen from webplatform's TodoMVC example.
macro_rules! enclose {
    ( ($( $x:ident ),*) $y:expr ) => {
        {
            $(let $x = $x.clone();)*
            $y
        }
    };
}

#[derive(Clone, Serialize, Deserialize)]
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

        let bit_string: Vec<char> = {
            let mut raw_bytes = f64_bytes.clone();
            &raw_bytes.reverse();

            let mut s = String::new();
            for &byte in &raw_bytes {
                write!(&mut s, "{:0>8b}", byte).expect("Couldn't write byte string to buffer");
            }
            s.chars().collect()
        };

        let (sign_bit, exponent_bits, mantissa_bits) = {
            let sign_bit = char_to_bit(bit_string[0]);

            let mut exponent_bits = Vec::with_capacity(11);
            for i in 1..12 {
                exponent_bits.push(char_to_bit(bit_string[i]));
            }

            let mut mantissa_bits = Vec::with_capacity(52);
            for i in 12..64 {
                mantissa_bits.push(char_to_bit(bit_string[i]));
            }

            (sign_bit, exponent_bits, mantissa_bits)
        };

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

fn char_to_bit(c: char) -> bool {
    if c == '0' {
        false
    } else if c == '1' {
        true
    } else {
        panic!("Unexpected character {}", c);
    }
}

fn main() {
    stdweb::initialize();
    let float_input: InputElement = document()
        .get_element_by_id("float-input")
        .unwrap()
        .try_into()
        .unwrap();

    float_input.add_event_listener(enclose!( (float_input) move |_: KeyupEvent| {
        let input_val = float_input.value().into_string().unwrap();
        let parsed_float = f64::from_str(&input_val).unwrap_or(f64::NAN);
        let float64 = Float64::new(parsed_float);
        update(float64);
    }));

    update(Float64::new(0.0));
    stdweb::event_loop();
}

fn update(props: Float64) {
    js! {
        update( @{props} );
    }
}
