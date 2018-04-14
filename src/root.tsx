import * as React from "react";
import * as ReactDOM from "react-dom";
import AppView from "./views/AppView";
// import { createStore, combineReducers, applyMiddleware } from 'redux'
// import { Provider } from 'react-redux'
// import createHistory from 'history/createBrowserHistory'
// import { Route } from 'react-router'
// import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
// // Create a history of your choosing (we're using a browser history in this case)
// const history = createHistory()
//
// // Build the middleware for intercepting and dispatching navigation actions
// const middleware = routerMiddleware(history)
//
// const store = createStore(
//   combineReducers({
//     ...reducers,
//     router: routerReducer
//   }),
//   applyMiddleware(middleware)
// )
ReactDOM.render(<AppView />, document.getElementById("app-container"));
