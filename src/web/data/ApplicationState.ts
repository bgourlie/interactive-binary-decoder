export interface LoadingState {
  readonly state: "loading";
  readonly model: {};
}

export type ApplicationState = LoadingState;
