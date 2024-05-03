import React from "react";
import Home from "./Home";

const Root = () => {
  return true ? <Home /> : <AuthForm />;
}

export default Root;