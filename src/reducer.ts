import {History} from "history";
import {Store} from "redux";
import * as Paths from "./paths";

const LOCATION_CHANGE = "LOCATION_CHANGE";
const FIGURE_1_UPDATE_VALUE = "FIGURE_1_UPDATE_VALUE";
const FIGURE_1_TOGGLE_PLAY = "FIGURE_1_TOGGLE_PLAY";

export interface Chapter01Section01State {
  readonly selectedChapter: 1;
  readonly selectedSection: 1;
}

export interface Chapter01Section02State {
  readonly selectedChapter: 1;
  readonly selectedSection: 2;
  readonly figure1Value: number;
  readonly figure1Playing: boolean;
}

export interface Chapter01Section03State {
  readonly selectedChapter: 1;
  readonly selectedSection: 3;
}

export interface Chapter02Section01State {
  readonly selectedChapter: 2;
  readonly selectedSection: 1;
}

export interface Chapter02Section02State {
  readonly selectedChapter: 2;
  readonly selectedSection: 2;
}

export interface Chapter02Section03State {
  readonly selectedChapter: 2;
  readonly selectedSection: 3;
}

export interface NotFoundState {
  readonly selectedChapter: -1;
  readonly selectedSection: -1;
}

export type ApplicationState =
  | Chapter01Section01State
  | Chapter01Section02State
  | Chapter01Section03State
  | Chapter02Section01State
  | Chapter02Section02State
  | Chapter02Section03State
  | NotFoundState;

export interface LocationChangeAction {
  readonly type: typeof LOCATION_CHANGE;
  readonly path: string;
}

export interface Figure1UpdateValueAction {
  readonly type: typeof FIGURE_1_UPDATE_VALUE;
  readonly value: number;
  readonly pause: boolean;
}

export interface Figure1TogglePlayAction {
  readonly type: typeof FIGURE_1_TOGGLE_PLAY;
}

type Action =
  | LocationChangeAction
  | Figure1UpdateValueAction
  | Figure1TogglePlayAction;

const locationChange = (url: string): LocationChangeAction => ({
  type: LOCATION_CHANGE,
  path: url
});

export const figure1UpdateValue = (
  value: number,
  pause: boolean
): Figure1UpdateValueAction => ({
  type: FIGURE_1_UPDATE_VALUE,
  value: value,
  pause: pause
});

export const figure1TogglePlay = (): Figure1TogglePlayAction => ({
  type: FIGURE_1_TOGGLE_PLAY
});

function initialStateFromPath(path: string): ApplicationState {
  switch (path) {
    case Paths.CHAPTER_01_SECTION_01:
      return {selectedChapter: 1, selectedSection: 1};
    case Paths.CHAPTER_01_SECTION_02:
      return {
        selectedChapter: 1,
        selectedSection: 2,
        figure1Value: 0,
        figure1Playing: true
      };
    case Paths.CHAPTER_01_SECTION_03:
      return {selectedChapter: 1, selectedSection: 3};
    case Paths.CHAPTER_02_SECTION_01:
      return {selectedChapter: 2, selectedSection: 1};
    case Paths.CHAPTER_02_SECTION_02:
      return {selectedChapter: 2, selectedSection: 2};
    case Paths.CHAPTER_02_SECTION_03:
      return {selectedChapter: 2, selectedSection: 3};
    default:
      return {selectedChapter: -1, selectedSection: -1};
  }
}

export function startLocationChangeListener(history: History, store: Store) {
  // Dispatch the initial history state
  store.dispatch(locationChange(history.location.pathname));

  history.listen(location => store.dispatch(locationChange(location.pathname)));
}

function C01S02Guard(
  state: ApplicationState,
  callback: (chapterState: Chapter01Section02State) => ApplicationState
) {
  if (state.selectedChapter === 1 && state.selectedSection === 2) {
    return callback(state);
  }

  return state;
}

export const appReducer = (
  state: ApplicationState,
  action: Action
): ApplicationState => {
  state = state || {selectedChapter: 1, selectedSection: 1};
  switch (action.type) {
    case LOCATION_CHANGE:
      return initialStateFromPath(action.path);

    case FIGURE_1_UPDATE_VALUE:
      return C01S02Guard(state, chapterState => {
        let newValue: number;
        if (action.value > 255) {
          newValue = 0;
        } else if (action.value < 0) {
          newValue = 255;
        } else {
          newValue = action.value;
        }
        return {
          ...chapterState,
          figure1Value: newValue,
          figure1Playing: !action.pause
        };
      });

    case FIGURE_1_TOGGLE_PLAY:
      return C01S02Guard(state, chapterState => {
        return {
          ...chapterState,
          figure1Playing: !chapterState.figure1Playing
        };
      });

    default:
      return state;
  }
};
