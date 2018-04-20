import {History} from "history";

const PUSH = "ROUTER/PUSH";
const REPLACE = "ROUTER/REPLACE";
const GO = "ROUTER/GO";
const GO_BACK = "ROUTER/GO_BACK";
const GO_FORWARD = "ROUTER/GO_FORWARD";

type Action = PushAction | ReplaceAction | GoAction | GoBackAction | GoForwardAction;

interface PushAction {
  type: typeof PUSH;
  payload: string;
}

interface ReplaceAction {
  type: typeof REPLACE;
  payload: string;
}

interface GoAction {
  type: typeof GO;
  payload: number;
}

interface GoBackAction {
  type: typeof GO_BACK;
}

interface GoForwardAction {
  type: typeof GO_FORWARD;
}

export const push = (href: string): PushAction => ({
  type: PUSH,
  payload: href
});

export const replace = (href: string): ReplaceAction => ({
  type: REPLACE,
  payload: href
});

export const go = (index: number): GoAction => ({
  type: GO,
  payload: index
});

export const goBack = (): GoBackAction => ({
  type: GO_BACK
});

export const goForward = (): GoForwardAction => ({
  type: GO_FORWARD
});

export const routerMiddleware = (history: History) => () => (next: any) => (action: Action) => {
  switch(action.type) {
    case PUSH:
      history.push(action.payload);
      break;

    case REPLACE:
      history.replace(action.payload);
      break;

    case GO:
      history.go(action.payload);
      break;

    case GO_BACK:
      history.goBack();
      break;

    case GO_FORWARD:
      history.goForward();
      break;

    default:
      return next(action);
  }
};
