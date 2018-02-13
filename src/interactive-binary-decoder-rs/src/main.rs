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
    original_value: f64,
}

js_serializable!(Float);

impl TryFrom<JsonValue> for Float {
    type Error = ();

    fn try_from(value: JsonValue) -> Result<Self, Self::Error> {
        if let JsonValue::Object(float64) = value {
            let float64: BTreeMap<String, JsonValue> = float64.into();

            let sign_bit = if let Some(&JsonValue::Bool(val)) = float64.get("sign_bit") {
                val
            } else {
                return Err(());
            };

            let exponent_bits =
                if let Some(&JsonValue::Array(ref arr)) = float64.get("exponent_bits") {
                    let arr: Vec<JsonValue> = arr.into();
                    let exponent_bits: Vec<bool> = arr.iter()
                        .filter_map(|v| {
                            if let &JsonValue::Bool(bit) = v {
                                Some(bit)
                            } else {
                                None
                            }
                        })
                        .collect();

                    if arr.len() == exponent_bits.len() {
                        exponent_bits
                    } else {
                        // exponent_bits contained non-bool value
                        return Err(());
                    }
                } else {
                    // exponent_bits not an array
                    return Err(());
                };

            let exponent_value: u16 =
                if let Some(&JsonValue::Number(val)) = float64.get("exponent_value") {
                    if let Ok(val) = val.try_into() {
                        val
                    } else {
                        // number can't be converted to a u16
                        return Err(());
                    }
                } else {
                    // exponent_value is not a number
                    return Err(());
                };

            let mantissa_bits =
                if let Some(&JsonValue::Array(ref arr)) = float64.get("mantissa_bits") {
                    let arr: Vec<JsonValue> = arr.into();
                    let mantissa_bits: Vec<bool> = arr.iter()
                        .filter_map(|v| {
                            if let &JsonValue::Bool(bit) = v {
                                Some(bit)
                            } else {
                                None
                            }
                        })
                        .collect();

                    if arr.len() == mantissa_bits.len() {
                        mantissa_bits
                    } else {
                        // mantissa_bits contained non-bool value
                        return Err(());
                    }
                } else {
                    // mantissa_bits not an array
                    return Err(());
                };

            let mantissa_value: u64 =
                if let Some(&JsonValue::Number(val)) = float64.get("mantissa_value") {
                    if let Ok(val) = val.try_into() {
                        val
                    } else {
                        // number can't be converted to a u64
                        return Err(());
                    }
                } else {
                    // mantissa_value is not a number
                    return Err(());
                };

            let original_value: f64 =
                if let Some(&JsonValue::Number(val)) = float64.get("mantissa_value") {
                    if let Ok(val) = val.try_into() {
                        val
                    } else {
                        // number can't be converted to a f64
                        return Err(());
                    }
                } else {
                    // original_value is not a number
                    return Err(());
                };

            Ok(Float {
                sign_bit,
                exponent_bits,
                exponent_value,
                mantissa_bits,
                mantissa_value,
                original_value,
            })
        } else {
            Err(())
        }
    }
}

impl Float {
    fn new(f64_val: f64) -> Float {
        let f64_bytes: [u8; 8] = unsafe { std::mem::transmute(f64_val) };

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
            original_value: f64_val,
        }
    }
}

impl Default for Float {
    fn default() -> Self {
        Float::new(0.0)
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
    let val = f64::from_str(string_val).unwrap_or(f64::NAN);
    Float::new(val)
}
