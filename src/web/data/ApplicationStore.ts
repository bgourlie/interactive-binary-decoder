const Immutable = require("immutable/dist/immutable");
import { ReduceStore } from "flux/utils";
import { ApplicationAction, InitialLoadAction } from "./ApplicationAction";
import AppDispatcher from "./ApplicationDispatcher";
import { ApplicationState, LoadingState } from "./ApplicationState";

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

  getState(): LoadingState {
    return super.getState();
  }

  getInitialState(): LoadingState {
    return { state: "loading", model: { name: "brian" } };
  }

  reduce(state: LoadingState, action: InitialLoadAction): ApplicationState {
    return Immutable.OrderedMap();
  }
}

export default new ApplicationStore();
