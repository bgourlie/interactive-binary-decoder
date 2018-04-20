import * as React from "react";
import * as ReactDOM from "react-dom";

import RouteNotFound from "./components/RouteNotFound";
import TableOfContents from "./components/TableOfContents";
import BinaryCounter from "./components/BinaryCounter";
import PageC01S01 from "./markdown/c01_s01.md";
import PageC01S02 from "./markdown/c01_s02.md";
import PageC01S03 from "./markdown/c01_s03.md";
import PageC02S01 from "./markdown/c02_s01.md";
import PageC02S02 from "./markdown/c02_s02.md";
import PageC02S03 from "./markdown/c02_s03.md";
import {ChapterModel} from "./models";
import {css, StyleSheet} from "./styles";
import * as Paths from "./paths";
import createBrowserHistory from "history/createBrowserHistory";
import {
  ApplicationState,
  appReducer,
  startLocationChangeListener
} from "./reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {routerMiddleware} from "./router";

const history = createBrowserHistory();
const middleware = routerMiddleware(history)
const store = createStore<ApplicationState>(appReducer, {}, applyMiddleware(middleware));
startLocationChangeListener(history, store);
const chapters: ChapterModel[] = [
  {
    id: "c01",
    name: "Introduction",
    sections: [
      { id: "s01", name: "Welcome!", path: Paths.CHAPTER_01_SECTION_01 },
      {
        id: "s02",
        name: "Representing numbers in binary",
        path: Paths.CHAPTER_01_SECTION_02
      },
      {
        id: "s03",
        name: "Integer Representations",
        path: Paths.CHAPTER_01_SECTION_03
      }
    ]
  },
  {
    id: "c02",
    name: "The Floating Point Binary Format",
    sections: [
      { id: "s01", name: "The Sign Bit", path: Paths.CHAPTER_02_SECTION_01 },
      {
        id: "s02",
        name: "The Exponent Bits",
        path: Paths.CHAPTER_02_SECTION_02
      },
      {
        id: "s03",
        name: "The Mantissa Bits",
        path: Paths.CHAPTER_02_SECTION_03
      }
    ]
  }
];

const styles = StyleSheet.create({
  appContainerInner: {
    display: "flex",
    flexDirection: "column"
  },
  appHeader: {
    marginBottom: "3rem"
  },
  pageTitle: {
    fontSize: "1.5rem"
  },
  pageSubtitle: {
    marginLeft: "0.5rem"
  },
  appBody: {
    display: "flex",
    flex: "1"
  },
  pageContainer: {
    flex: "1",
    padding: "0 3rem"
  }
});

const C01_S02 = () => (
  <div>
    <PageC01S02 />
    <BinaryCounter base10Digits={[0, 8]} base2Digits={[0, 0, 0, 0]} />
  </div>
);

function renderPage(state: ApplicationState) {
  if(state.selectedChapter === 1 && state.selectedSection === 1) {
    return <PageC01S01/>;
  } else if (state.selectedChapter === 1 && state.selectedSection === 2) {
    return <C01_S02 />;
  } else if (state.selectedChapter === 1 && state.selectedSection === 3) {
    return <PageC01S03/>;
  } else if (state.selectedChapter === 2 && state.selectedSection === 1) {
    return <PageC02S01/>;
  } else if (state.selectedChapter === 2 && state.selectedSection === 2) {
    return <PageC02S02/>;
  } else if (state.selectedChapter === 2 && state.selectedSection === 3) {
    return <PageC02S03/>;
  } else {
      return <RouteNotFound />;
  }
}

function renderApp(state: ApplicationState) {
  return (
    <section className={css(styles.appContainerInner)}>
      <header className={css(styles.appHeader)}>
        <span className={css(styles.pageTitle)}>What the float?</span>
        <span className={css(styles.pageSubtitle)}>
          An interactive guide to floating point numbers.
        </span>
      </header>
      <section className={css(styles.appBody)}>
        <TableOfContents chapters={chapters} currentChapter={state.selectedChapter} currentSection={state.selectedSection} />
        <section id="page" className={css(styles.pageContainer)}>{renderPage(state)}</section>
      </section>
    </section>
  );
}

let currentState = store.getState();
console.log(currentState);
// Subscribe to history changes
store.subscribe(() => {
  let previousLocation = currentState;
  currentState = store.getState();

  if (previousLocation.locationId !== currentState.locationId) {
    ReactDOM.render(renderApp(currentState), document.getElementById("app-container"));
  }
});

// Do initial rendering
ReactDOM.render(renderApp(currentState), document.getElementById("app-container"));
