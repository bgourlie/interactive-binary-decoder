import { History } from "history";
import { Reducer, Store } from "redux";
import * as Paths from "./paths";

const LOCATION_CHANGE = "LOCATION_CHANGE";
const FIGURE_1_VALUE_CHANGE = "FIGURE_1_VALUE_CHANGE";

interface Chapter01Section01State {
  readonly selectedChapter: 1;
  readonly selectedSection: 1;
}

interface Chapter01Section02State {
  readonly selectedChapter: 1;
  readonly selectedSection: 2;
  readonly figure1Value: number;
}

interface Chapter01Section03State {
  readonly selectedChapter: 1;
  readonly selectedSection: 3;
}

interface Chapter02Section01State {
  readonly selectedChapter: 2;
  readonly selectedSection: 1;
}

interface Chapter02Section02State {
  readonly selectedChapter: 2;
  readonly selectedSection: 2;
}

interface Chapter02Section03State {
  readonly selectedChapter: 2;
  readonly selectedSection: 3;
}

interface NotFoundState {
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

export interface Figure1ValueChangeAction {
  readonly type: typeof FIGURE_1_VALUE_CHANGE;
}

type Action = LocationChangeAction | Figure1ValueChangeAction;

const locationChange = (url: string): LocationChangeAction => ({
  type: LOCATION_CHANGE,
  path: url
});

export const decrementFigure1Value = (): Figure1ValueChangeAction => ({
  type: FIGURE_1_VALUE_CHANGE
});

function initialStateFromPath(path: string): ApplicationState {
  switch (path) {
    case Paths.CHAPTER_01_SECTION_01:
      return { selectedChapter: 1, selectedSection: 1 };
    case Paths.CHAPTER_01_SECTION_02:
      return { selectedChapter: 1, selectedSection: 2, figure1Value: 3 };
    case Paths.CHAPTER_01_SECTION_03:
      return { selectedChapter: 1, selectedSection: 3 };
    case Paths.CHAPTER_02_SECTION_01:
      return { selectedChapter: 2, selectedSection: 1 };
    case Paths.CHAPTER_02_SECTION_02:
      return { selectedChapter: 2, selectedSection: 2 };
    case Paths.CHAPTER_02_SECTION_03:
      return { selectedChapter: 2, selectedSection: 3 };
    default:
      return { selectedChapter: -1, selectedSection: -1 };
  }
}

export function startLocationChangeListener(history: History, store: Store) {
  // Dispatch the initial history state
  store.dispatch(locationChange(history.location.pathname));

  history.listen(location => store.dispatch(locationChange(location.pathname)));
}

export const appReducer = (
  state: ApplicationState,
  action: Action
): Reducer<ApplicationState> => {
  state = state || { selectedChapter: 1, selectedSection: 1 };
  switch (action.type) {
    case LOCATION_CHANGE:
      return initialStateFromPath(action.path);

    case FIGURE_1_VALUE_CHANGE:
      if (state.selectedChapter == 1 && state.selectedSection == 2) {
        const newValue =
          state.figure1Value === 0 ? 255 : state.figure1Value - 1;
        return { ...state, figure1Value: newValue };
      } else {
        return state;
      }

    default:
      return state;
  }
};
