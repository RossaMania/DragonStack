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

// Apply CORS middleware before routes
app.use(
  cors({
    origin: "http://localhost:1234",
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());

// Debugging middleware to log request and response headers
app.use((req, res, next) => {
  console.log("Request Headers:", req.headers);
  next();
});

app.use((req, res, next) => {
  res.on("finish", () => {
    console.log("Response Headers:", res.getHeaders());
  });
  next();
});

app.use("/account", accountRouter);
app.use("/dragon", dragonRouter);
app.use("/generation", generationRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // Return CORS headers in error responses too
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:1234");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  res.status(statusCode).json({
    type: "error",
    message: err.message,
  });
});

engine.start();

module.exports = app;