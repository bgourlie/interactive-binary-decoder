import "./static/Besley-Medium.otf";
import AppContainer from "./containers/AppContainer";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { DEFAULT_MODEL, DEFAULT_STATE } from "./data/ApplicationState";

ReactDOM.render(
  <AppContainer state={DEFAULT_STATE} model={DEFAULT_MODEL} />,
  document.getElementById("app-container")
);
