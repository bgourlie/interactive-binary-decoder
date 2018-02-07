import * as React from "react";
import * as ReactDOM from "react-dom";

interface AppWindow extends Window {
  update: (props: HelloProps) => void;
}

interface HelloProps { compiler: string; framework: string; }

const Hello = (props: HelloProps) => <h1>Hello from {props.compiler} and {props.framework}!</h1>;

(window as AppWindow).update = (state: HelloProps) => {
    ReactDOM.render(Hello(state), document.getElementById("example"));
};

