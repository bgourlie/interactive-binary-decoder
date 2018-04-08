import * as React from "react";
import { ApplicationModel, ApplicationStates } from "../data/ApplicationState";
import Header from "../components/Header";
import TableOfContents from "../components/TableOfContents";

interface ApplicationProps {
  readonly state: ApplicationStates;
  readonly model: ApplicationModel;
}

function AppView(props: ApplicationProps): React.ReactNode {
  const { state, model } = props;
  switch (state) {
    case "loading":
      return appBody(<div>We're loading, {model.name}</div>);
    default:
      return appBody(<div>Unknown state!</div>);
  }
}

function appBody(view: React.ReactNode): React.ReactNode {
  return (
    <section id="app-body">
      <Header />
      <section id="toc-and-view">
        <TableOfContents />
        <section id="view">{view}</section>
      </section>
    </section>
  );
}

export default AppView;
