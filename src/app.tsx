import * as React from "react";
import * as ReactDOM from "react-dom";

interface AppWindow extends Window {
    update: (props: FloatValue) => void;
}

interface FloatValue {
    sign: boolean,
    exponent: [boolean],
    mantissa: [boolean]
}

const Float = (props: FloatValue) => {
    const exponentBits = props.exponent.map((bit, i) => <div key={i}>{bit ? "1" : "0"}</div>);
    const mantissaBits = props.mantissa.map((bit, i) => <div key={i}>{bit ? "1" : "0"}</div>);
    return (
        <div className="float">
            <div className="sign">
                <div className="bits">
                    <div>{props.sign ? "1" : "0"}</div>
                </div>
            </div>
            <div className="exponent">
                <div className="bits">{exponentBits}</div>
            </div>
            <div className="mantissa">
                <div className="bits">{mantissaBits}</div>
            </div>
        </div>
    );
};

(window as AppWindow).update = (state: FloatValue) => {
    ReactDOM.render(Float(state), document.getElementById("bits"));
};

