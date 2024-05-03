import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

import store from "./store";

import "./index.css";
import Root from "./components/Root";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Root />
  </Provider>
);
