const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const GenerationEngine = require("./generation/engine.js");
const dragonRouter = require("./api/dragon.js");
const generationRouter = require("./api/generation.js");
const accountRouter = require("./api/account.js");

const app = express();
const engine = new GenerationEngine();

app.locals.engine = engine;

app.use(cors({ origin: "http://localhost:1234", credentials: true }));

app.use(express.json());

app.use(cookieParser());

app.use("/account", accountRouter);

app.use("/dragon", dragonRouter);

app.use("/generation", generationRouter);

app.use((err, req, res, next) => {

  const statusCode = err.statusCode || 500;

  res.json({
    type: 'error', message: err.message
  })
});

engine.start();

module.exports = app;