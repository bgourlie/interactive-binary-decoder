import {History} from "history";
import {Reducer, Store} from "redux";
import * as Paths from "./paths";

const LOCATION_CHANGE = "ROUTER/LOCATION_CHANGE";

type ActionType = typeof LOCATION_CHANGE;

interface Chapter01Section01State {
  readonly selectedChapter: 1;
  readonly selectedSection: 1;
}

interface Chapter01Section02State {
  readonly selectedChapter: 1;
  readonly selectedSection: 2;
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
  Chapter01Section01State |
  Chapter01Section02State |
  Chapter01Section03State |
  Chapter02Section01State |
  Chapter02Section02State |
  Chapter02Section03State |
  NotFoundState;

interface Action {
  readonly type: ActionType;
  readonly payload: ApplicationState
}

export const locationChange = (state: ApplicationState) => ({
  type: LOCATION_CHANGE,
  payload: {...state}
});

function getInitialPageStateFromPath(path: string): ApplicationState {
  switch(path) {
    case Paths.CHAPTER_01_SECTION_01:
      return { selectedChapter: 1, selectedSection: 1 };
    case Paths.CHAPTER_01_SECTION_02:
      return { selectedChapter: 1, selectedSection: 2 };
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
  store.dispatch(locationChange(getInitialPageStateFromPath(history.location.pathname)));

  history.listen(location => store.dispatch(locationChange(getInitialPageStateFromPath(location.pathname))))
}

export const appReducer = (state: ApplicationState, action: Action): Reducer<ApplicationState> => {
  state = state || {selectedChapter: 1, selectedSection: 1};
  switch(action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

