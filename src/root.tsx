import * as React from "react";
import * as ReactDOM from "react-dom";

import RouteNotFound from "./components/RouteNotFound";
import {TableOfContentsContainer} from "./components/TableOfContents";
import {css, StyleSheet} from "./styles";
import createBrowserHistory from "history/createBrowserHistory";
import {
  ApplicationState,
  appReducer,
  startLocationChangeListener
} from "./reducer";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import {routerMiddleware} from "./router";
import {C01S02Container} from "./components/pages/C01S02";
import {C02S03} from "./components/pages/C02S03";
import {C02S02} from "./components/pages/C02S02";
import {C02S01} from "./components/pages/C02S01";
import {C01S03} from "./components/pages/C01S03";
import {C01S01} from "./components/pages/C01S01";

const history = createBrowserHistory();
const middleware = routerMiddleware(history);
const store = createStore<ApplicationState>(
  appReducer,
  {},
  applyMiddleware(middleware)
);
startLocationChangeListener(history, store);

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

function renderPage(state: ApplicationState) {
  if (state.selectedChapter === 1 && state.selectedSection === 1) {
    return <C01S01/>;
  } else if (state.selectedChapter === 1 && state.selectedSection === 2) {
    return <C01S02Container/>;
  } else if (state.selectedChapter === 1 && state.selectedSection === 3) {
    return <C01S03/>;
  } else if (state.selectedChapter === 2 && state.selectedSection === 1) {
    return <C02S01/>;
  } else if (state.selectedChapter === 2 && state.selectedSection === 2) {
    return <C02S02/>;
  } else if (state.selectedChapter === 2 && state.selectedSection === 3) {
    return <C02S03/>;
  } else {
    return <RouteNotFound/>;
  }
}

function renderApp(state: ApplicationState) {
  return (
    <Provider store={store}>
      <section className={css(styles.appContainerInner)}>
        <header className={css(styles.appHeader)}>
          <span className={css(styles.pageTitle)}>What the float?</span>
          <span className={css(styles.pageSubtitle)}>
            An interactive guide to floating point numbers.
          </span>
        </header>
        <section className={css(styles.appBody)}>
          <TableOfContentsContainer/>
          <section id="page" className={css(styles.pageContainer)}>
            {renderPage(state)}
          </section>
        </section>
      </section>
    </Provider>
  );
}

// Subscribe to history changes
store.subscribe(() => {
  ReactDOM.render(
    renderApp(store.getState()),
    document.getElementById("app-container")
  );
});

// Do initial rendering
ReactDOM.render(
  renderApp(store.getState()),
  document.getElementById("app-container")
);
