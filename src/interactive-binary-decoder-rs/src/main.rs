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
    sign: bool,
    exponent: Vec<bool>,
    mantissa: Vec<bool>,
}

js_serializable!(Float64);

impl Float64 {
    fn new(val: f64) -> Float64 {
        let raw_bytes: [u8; 8] = unsafe { std::mem::transmute(val) };
        let mut reader = BitReader::new(&raw_bytes);

        let sign = reader.read_bool().unwrap();

        let mut exponent = Vec::with_capacity(11);
        for _ in 0..11 {
            exponent.push(reader.read_bool().unwrap());
        }

        let mut mantissa = Vec::with_capacity(52);
        for _ in 0..52 {
            mantissa.push(reader.read_bool().unwrap());
        }

        Float64 {
            sign,
            exponent,
            mantissa,
        }
    }
}

fn main() {
    stdweb::initialize();
    let f64_bits = Float64::new(1.213212);
    update(f64_bits);
    stdweb::event_loop();
}

fn update(props: Float64) {
    js! {
        update( @{props} );
    }
}
