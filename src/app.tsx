import * as React from "react";
import * as ReactDOM from "react-dom";

interface AppWindow extends Window {
    update: (props: FloatValue) => void;
}

interface FloatValue {
    sign_bit: boolean,
    exponent_bits: [boolean],
    exponent_value: number,
    mantissa_bits: [boolean],
    mantissa_value: number,
    original_value: number
}

const Float = (props: FloatValue) => {
    const exponentBits = props.exponent_bits.map((bit, i) => <div key={i}>{bit ? "1" : "0"}</div>);
    const mantissaBits = props.mantissa_bits.map((bit, i) => <div key={i}>{bit ? "1" : "0"}</div>);
    return (
        <div>
            <div className="inputRow">
                <input id="float-input" type="text" value="0.0" />
            </div>
            <div className="float">
                <div className="sign">
                    <div className="bits">
                        <div>{props.sign_bit ? "1" : "0"}</div>
                    </div>
                    <div className="label">Sign</div>
                    <div className="value">{props.sign_bit ? "-" : "+"}</div>
                </div>
                <div className="exponent">
                    <div className="bits">{exponentBits}</div>
                    <div className="label">Exponent</div>
                    <div className="value">{props.exponent_value}</div>
                </div>
                <div className="mantissa">
                    <div className="bits">{mantissaBits}</div>
                    <div className="label">Mantissa</div>
                    <div className="value">{props.mantissa_value}</div>
                </div>
            </div>
            <div className="origValue">{props.original_value.toString(10)}</div>
        </div>
    );
};

const appWindow = window as AppWindow;
appWindow.update = (state: FloatValue) => ReactDOM.render(Float(state), document.getElementById("float-view"));
