const { Router } = require("express");

const router = new Router();

router.get("/new", (req, res) => {
  res.json({ dragon: req.app.locals.engine.generation.newDragon() });
}); // Express route web request endpoint to get a new dragon. This will be a GET request to the /dragon/new endpoint.

module.exports = router; // Export the router object..