import AppView from "../views/AppView";
import { Container } from "flux/utils";
import ApplicationStore from "../data/ApplicationStore";
import { ApplicationState } from "../data/ApplicationState";
import * as FluxStore from "flux/lib/FluxStore";
import { ApplicationAction } from "../data/ApplicationAction";

function getStores(): FluxStore<ApplicationAction>[] {
  return [ApplicationStore];
}

function getState(): ApplicationState {
  return ApplicationStore.getState();
}

export default Container.createFunctional(AppView, getStores, getState);
