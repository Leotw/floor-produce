import React, { Component } from "react";
import { Router, Route, IndexRoute, browserHistory, hashHistory, applyRouterMiddleware } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { useScroll } from "react-router-scroll";
import configureStore from "./store";
import App from "../containers/App";
import UserPage from "../containers/UserPage";
import RepoPage from "../containers/RepoPage";

const history = syncHistoryWithStore(browserHistory, configureStore());

const config = [
  {
    path: '/',
    component: App,
    // default index
    childRoutes: [
      {path: '/:login', name: 'UserPage', component: UserPage},
      {path: '/:login/:name', name: 'RepoPage', component: RepoPage},
    ]
  }
]

const route = (
  <Router
    history={history}
    routes={config}
    render={applyRouterMiddleware(useScroll())}>
  </Router>
)


export default route
