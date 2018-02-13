import * as React from "react";
import * as ReactDOM from "react-dom";
import {Float, parse_float} from "./interactive-binary-decoder-rs/Cargo.toml";

interface FloatProps {
    value: Float
}

const FloatView = (props: FloatProps) => {
    const exponentBits =
        props.value.exponent_bits.map((bit: boolean, i: number) => <div key={i}>{bit ? "1" : "0"}</div>);
    const mantissaBits =
        props.value.mantissa_bits.map((bit: boolean, i: number) => <div key={i}>{bit ? "1" : "0"}</div>);

    const floatInputChangedHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const parsed = parse_float(e.currentTarget.value);
        update(parsed);
    };

    return (
        <div>
            <div className="inputRow">
                <input id="float-input" type="text" onChange={floatInputChangedHandler} />
            </div>
            <div className="float">
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
            <div className="origValue">{props.value.original_value.toString(10)}</div>
        </div>
    );
};

export function update(float: Float) {
  ReactDOM.render(<FloatView value={float} />, document.getElementById("float-view"));
}

