const { Router } = require("express");

const router = new Router();

router.get("/", (req, res) => {
  res.json({ generation: req.app.locals.engine.generation });
}); // Express route web request endpoint to get the current generation. This will be a GET request to the /generation endpoint.

module.exports = router; // Export the router object.