import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

import Generation from "./components/Generation.js";
import Dragon from "./components/Dragon.js";

import store from "./store";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <h2>Dragon Stack</h2>
    <Generation />
    <Dragon />
  </Provider>
);
