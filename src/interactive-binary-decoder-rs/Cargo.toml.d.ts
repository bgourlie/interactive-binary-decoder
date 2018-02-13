declare module 'Cargo.toml' {

    export interface Float {
        sign_bit: boolean,
        exponent_bits: [boolean],
        exponent_value: number,
        mantissa_bits: [boolean],
        mantissa_value: number,
        native_value: number,
        parsed_from: string
    }

    export function parse_float(input: string): Float;
}