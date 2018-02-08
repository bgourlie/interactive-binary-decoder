#[macro_use]
extern crate stdweb;

#[macro_use]
extern crate serde_derive;

#[macro_use]
extern crate serde_json;

extern crate bitreader;

use std::f64;
use std::str::FromStr;
use stdweb::unstable::TryInto;
use stdweb::web::{document, IEventTarget};
use stdweb::web::event::KeyupEvent;
use stdweb::web::html_element::InputElement;

use bitreader::BitReader;

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
    exponent_value: u16,
    mantissa_bits: Vec<bool>,
    mantissa_value: u64,
}

js_serializable!(Float64);

impl Float64 {
    fn new(val: f64) -> Float64 {
        let raw_bytes: [u8; 8] = unsafe { std::mem::transmute(val) };

        let (sign_bit, exponent_bits, mantissa_bits) = {
            let mut reader = BitReader::new(&raw_bytes);

            let mut mantissa_bits = Vec::with_capacity(52);
            for _ in 0..52 {
                mantissa_bits.push(reader.read_bool().unwrap());
            }

            let mut exponent_bits = Vec::with_capacity(11);
            for _ in 0..11 {
                exponent_bits.push(reader.read_bool().unwrap());
            }

            let sign_bit = reader.read_bool().unwrap();
            (sign_bit, exponent_bits, mantissa_bits)
        };

        let (exponent_value, mantissa_value) = {
            let mut reader = BitReader::new(&raw_bytes);
            let mantissa_value = reader.read_u64(52).unwrap();
            let exponent_value = reader.read_u16(11).unwrap();
            (exponent_value, mantissa_value)
        };

        Float64 {
            sign_bit,
            exponent_bits,
            exponent_value,
            mantissa_bits,
            mantissa_value,
        }
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

    update(Float64::new(1.0));
    stdweb::event_loop();
}

fn update(props: Float64) {
    js! {
        update( @{props} );
    }
}
