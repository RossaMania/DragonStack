const express = require("express");
const apiProxy = require("../../middleware/proxy.js");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const GenerationEngine = require("./generation/engine.js");
const dragonRouter = require("./api/dragon.js");
const generationRouter = require("./api/generation.js");
const accountRouter = require("./api/account.js");

const app = express();
const engine = new GenerationEngine();

app.locals.engine = engine;

// Use the proxy middleware
app.use("/api", apiProxy);

app.use(
  cors({
    origin: "http://localhost:1234", credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/account", accountRouter);
app.use("/dragon", dragonRouter);
app.use("/generation", generationRouter);


// Preflight handling (OPTIONS requests)
app.options("*", cors({
  origin: "http://localhost:1234",
  credentials: true
}));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // Return CORS headers in error responses too
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:1234");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  res.status(statusCode).json({
    type: 'error',
    message: err.message,
  });
});

engine.start();

module.exports = app;