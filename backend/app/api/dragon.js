const { Router } = require("express");

const router = new Router();

app.get("/dragon/new", (req, res) => {
  res.json({ dragon: engine.generation.newDragon() });
}); // Express route web request endpoint to get a new dragon. This will be a GET request to the /dragon/new endpoint.