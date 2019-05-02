import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route } from "react-router-dom";
import reducer from "./store/reducer";
import singleIssueReducer from './store/singleIssueReducer';
import SingleIssue from "./components/SingleIssue/SingleIssue";

const rootReducer = combineReducers({reducer, singleIssueReducer})

const middleware = applyMiddleware(thunk);
const store = createStore(rootReducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={App} exact/>
      <Route path="/:pageNumber" component={App} exact/>
      <Route path="/issues/:number" component={SingleIssue} exact />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
