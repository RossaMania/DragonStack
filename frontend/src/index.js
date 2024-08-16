import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { render } from "react-dom";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import store from "./store";
import Root from "./components/Root";
import { useAuthenticatedQuery } from "./slices/usersApiSlice";
import { setLoginStatus } from "./slices/authSlice";
import './index.css';

const App = () => {
  const dispatch = useDispatch();
  const { data, error } = useAuthenticatedQuery();

  useEffect(() => {
    if (data) {
      dispatch(setLoginStatus(data.authenticated));
    } else if (error) {
      dispatch(setLoginStatus(false));
    }
  }, [data, error, dispatch]);

  return <Root />;
};

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);