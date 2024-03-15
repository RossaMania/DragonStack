import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { createRoot } from "react-dom/client";
import Generation from "./components/Generation";
import Dragon from "./components/Dragon";

import "./index.css";

const DEFAULT_GENERATION = { generationId: "", expiration: "" };

const generationReducer = () => {

  return { generation: DEFAULT_GENERATION };

}

const store = configureStore({ reducer: generationReducer });

store.dispatch();

const root = document.getElementById("root");
createRoot(root).render(
  <div>
    <h2>Dragon Stack</h2>
    <Generation />
    <Dragon />
  </div>
);
