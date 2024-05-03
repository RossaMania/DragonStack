import React from "react";
import { useSelector } from "react-redux";
import Home from "./Home";
import AuthForm from "./AuthForm";

const Root = () => {

  const userInfo = useSelector(state => state.auth.userInfo);

  return userInfo ? <Home /> : <AuthForm />;
}

export default Root;