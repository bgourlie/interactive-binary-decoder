const Immutable = require("immutable/dist/immutable");
import { ReduceStore } from "flux/utils";
import { ApplicationAction } from "./ApplicationAction";
import AppDispatcher from "./ApplicationDispatcher";
import { ApplicationState } from "./ApplicationState";

export abstract class BaseApplicationStore extends ReduceStore<
  ApplicationState,
  ApplicationAction
> {
  abstract get type(): "app-store";
}

class ApplicationStore extends BaseApplicationStore {
  constructor() {
    super(AppDispatcher);
  }

  get type(): "app-store" {
    return "app-store";
  }

  getState(): ApplicationState {
    return super.getState();
  }

  getInitialState(): ApplicationState {
    return { state: "loading", model: {} };
  }

  reduce(state: ApplicationState, action: ApplicationAction): ApplicationState {
    return Immutable.OrderedMap();
  }
}

export default new ApplicationStore();
