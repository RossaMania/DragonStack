import React from "react";
import { createRoot } from "react-dom/client";
import Generation from "./components/Generation";
import Dragon from "./components/Dragon";

import "./index.css";

const root = document.getElementById("root");
createRoot(root).render(
  <div>
    <h2>Dragon Stack</h2>
    <Generation />
    <Dragon />
  </div>
);
