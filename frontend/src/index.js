import React from "react";
import { createRoot } from "react-dom/client";
import Generation from "./components/Generation";

const root = document.getElementById("root");
createRoot(root).render(
  <div>
    <h2>Dragon Stack from React</h2>
    <Generation />
  </div>
);
