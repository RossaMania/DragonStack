const express = require("express");
const cors = require("cors");
const GenerationEngine = require("./generation/engine.js");
const dragonRouter = require("./api/dragon.js");
const generationRouter = require("./api/generation.js");
const accountRouter = require("./api/account.js");

const app = express();
const engine = new GenerationEngine();

app.locals.engine = engine; // Set the engine object on the app.locals object to be used in the dragonRouter.

app.use(cors({ origin: "http://localhost:1234" }));

app.use(express.json());

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

module.exports = app; // Export the app object to be used in the tests.