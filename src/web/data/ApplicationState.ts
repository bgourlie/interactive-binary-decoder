export interface ApplicationStateBase {
  readonly state: ApplicationStates;
}

export interface LoadingState extends ApplicationStateBase {
  readonly state: "loading";
  readonly model: LoadingModel;
}

export interface LoadingModel {
  name: "brian";
}

export type ApplicationStates = "loading";
export type ApplicationState = LoadingState;
export type ApplicationModel = LoadingModel;
