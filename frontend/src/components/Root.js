import React from "react";
import Home from "./Home";

const Root = () => {
  return true ? <Home /> : <ComponentTwo />;
}

export default Root;