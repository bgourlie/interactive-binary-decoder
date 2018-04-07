import * as React from "react";
import { ApplicationModel, ApplicationStates } from "../data/ApplicationState";

interface ApplicationProps {
  readonly state: ApplicationStates;
  readonly model: ApplicationModel;
}

function AppView(props: ApplicationProps) {
  const { state, model } = props;
  switch (state) {
    case "loading":
      return <div>We're loading, {model.name}</div>;
    default:
      return <div>Unknown state!</div>;
  }
}

export default AppView;
