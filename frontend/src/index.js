import React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { createBrowserHistory } from "history";

import store from "./store";
import './index.css';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);