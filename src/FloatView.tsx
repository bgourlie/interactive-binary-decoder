import * as React from "react";
import * as ReactDOM from "react-dom";
import {Float, parse_float} from "./interactive-binary-decoder-rs/Cargo.toml";

interface FloatProps {
    value: Float
}

const FloatView = (props: FloatProps) => {
    const floatInputChangedHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const parsed = parse_float(e.currentTarget.value);
        update(parsed);
    };

    const exponentBits =
        props.value.exponent_bits.map((bit: boolean, i: number) => <div key={i}>{bit ? "1" : "0"}</div>);

    const mantissaBits =
        props.value.mantissa_bits.map((bit: boolean, i: number) => <div key={i}>{bit ? "1" : "0"}</div>);

    const normalizedInputString = normalizeFloatString(props.value.parsed_from);
    const inputPrecision = getPrecision(normalizedInputString);
    const actualFloatString = props.value.native_value.toFixed(inputPrecision);
    const showActualFloatString = normalizedInputString && actualFloatString !== normalizedInputString;
    const inputIsNaN = Number.isNaN(props.value.native_value);

    return (
        <div>
            <div className="inputRow">
                <input className={`float-input ${inputIsNaN ? "is-nan" : ""}`}
                       type="text"
                       placeholder="Enter a number"
                       onChange={floatInputChangedHandler}/>
                <div className={`decoded-value ${showActualFloatString ? "show" : ""}`}>{actualFloatString}</div>
            </div>
            <div className={`decoded-float ${props.value.parsed_from ? "show" : ""}`}>
                <div className="sign">
                    <div className="bits">
                        <div>{props.value.sign_bit ? "1" : "0"}</div>
                    </div>
                    <div className="label">Sign</div>
                    <div className="value">{props.value.sign_bit ? "-" : "+"}</div>
                </div>
                <div className="exponent">
                    <div className="bits">{exponentBits}</div>
                    <div className="label">Exponent</div>
                    <div className="value">{props.value.exponent_value}</div>
                </div>
                <div className="mantissa">
                    <div className="bits">{mantissaBits}</div>
                    <div className="label">Mantissa</div>
                    <div className="value">{props.value.mantissa_value}</div>
                </div>
            </div>
        </div>
    );
};

/**
 * Determines the precision (number of decimal digits) of a float string.
 * @param {string} input
 * A string that represents a float.
 *
 * @returns {number}
 * The number of decimal digits in the string.
 */
const getPrecision = (input: string): number => {
    const decimalDigits = input.trim().split(".", 2)[1];
    return decimalDigits ? Math.min(decimalDigits.length, 20) : 0;
};

/**
 * Normalizes the float input string so that it can be reliably compared to the actual float string.
 * @param {string} input
 * A string representing a float
 *
 * @returns {string}
 * The normalized float string representation. If the supplied input string is empty, an empty string is returned.
 */
const normalizeFloatString = (input: string): string => {
    const trimmed = input.trim();

    if (trimmed.length === 0) {
        return "";
    }

    const parts = trimmed.split(".", 2);
    if (!parts[1]) {
        parts[1] = "0";
    }

    return parts.join(".");
};

export function update(float: Float) {
    ReactDOM.render(<FloatView value={float}/>, document.getElementById("float-view"));
}

