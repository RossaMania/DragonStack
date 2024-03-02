const { Router } = require("express");
const DragonTable = require("../dragon/table.js"); // Import the DragonTable class from the table.js file in the dragon directory.

const router = new Router();

router.get("/new", (req, res, next) => {

  const dragon = req.app.locals.engine.generation.newDragon(); // Get a new dragon instance from the generation engine.

  DragonTable.storeDragon(dragon) // Store the dragon in the database.
  .then(({ dragonId }) => {
    console.log('dragonId', dragonId);

    dragon.dragonId = dragonId;

    res.json({ dragon }); // Send the dragon as a JSON response.
  })
  .catch(error => next(error)); // Pass any errors to the error handling middleware.

});

module.exports = router; // Export the router object..