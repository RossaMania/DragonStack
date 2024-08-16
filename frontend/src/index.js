import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import store from "./store";
import './index.css';

import App from "./App";
import Root from "./components/Root";
import AccountDragons from "./components/AccountDragons";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/" element={<Root />} />
      <Route path="/account-dragons" element={<AccountDragons />} />
    </Route>

  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);