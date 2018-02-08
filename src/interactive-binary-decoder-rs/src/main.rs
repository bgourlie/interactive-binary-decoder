#[macro_use]
extern crate stdweb;

#[macro_use]
extern crate serde_derive;

#[macro_use]
extern crate serde_json;

extern crate bitreader;

use stdweb::web::document;
use bitreader::BitReader;

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
    let f64_bits = Float64::new(1.0);
    update(f64_bits);
    stdweb::event_loop();
}

fn update(props: Float64) {
    js! {
        update( @{props} );
    }
}
