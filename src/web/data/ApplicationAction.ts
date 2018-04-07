export interface InitialLoadAction {
  readonly type: "initial-load";
}

export type ApplicationAction = InitialLoadAction;
