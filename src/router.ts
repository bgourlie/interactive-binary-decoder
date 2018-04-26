import {History} from "history";
import * as Paths from "./paths";

const PUSH = "ROUTER/PUSH";
const REPLACE = "ROUTER/REPLACE";
const GO = "ROUTER/GO";
const GO_BACK = "ROUTER/GO_BACK";
const GO_FORWARD = "ROUTER/GO_FORWARD";

type Action =
  | PushAction
  | ReplaceAction
  | GoAction
  | GoBackAction
  | GoForwardAction;

interface PushAction {
  type: typeof PUSH;
  path: string;
}

interface ReplaceAction {
  type: typeof REPLACE;
  path: string;
}

interface GoAction {
  type: typeof GO;
  path: number;
}

interface GoBackAction {
  type: typeof GO_BACK;
}

interface GoForwardAction {
  type: typeof GO_FORWARD;
}

export const push = (href: string): PushAction => ({
  type: PUSH,
  path: href
});

export const replace = (href: string): ReplaceAction => ({
  type: REPLACE,
  path: href
});

export const go = (index: number): GoAction => ({
  type: GO,
  path: index
});

export const pushSection = (chapter: number, section: number): PushAction => {
  switch (chapter) {
    case 1:
      switch (section) {
        case 1:
          return push(Paths.CHAPTER_01_SECTION_01);
        case 2:
          return push(Paths.CHAPTER_01_SECTION_02);
        case 3:
          return push(Paths.CHAPTER_01_SECTION_03);
        default:
          return push(Paths.NOT_FOUND);
      }
    case 2:
      switch (section) {
        case 1:
          return push(Paths.CHAPTER_02_SECTION_01);
        case 2:
          return push(Paths.CHAPTER_02_SECTION_02);
        case 3:
          return push(Paths.CHAPTER_02_SECTION_03);
        default:
          return push(Paths.NOT_FOUND);
      }

    default:
      return push(Paths.NOT_FOUND);
  }
};

export const goBack = (): GoBackAction => ({
  type: GO_BACK
});

export const goForward = (): GoForwardAction => ({
  type: GO_FORWARD
});

export const routerMiddleware = (history: History) => () => (next: any) => (
  action: Action
) => {
  switch (action.type) {
    case PUSH:
      history.push(action.path);
      break;

    case REPLACE:
      history.replace(action.path);
      break;

    case GO:
      history.go(action.path);
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
