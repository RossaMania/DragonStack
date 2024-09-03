const { Router } = require("express");
const DragonTable = require("../dragon/table.js");
const AccountDragonTable = require("../accountDragon/table.js");
const { authenticatedAccount } = require("./helper.js");
const { getPublicDragons } = require("../dragon/helper.js");

const router = new Router();

router.get("/new", (req, res, next) => {

  let accountId, dragon;

  authenticatedAccount({ sessionString: req.cookies.sessionString })
  .then(({ account }) => {
    accountId = account.id;

    dragon = req.app.locals.engine.generation.newDragon(); // Get a new dragon instance from the generation engine.

    return DragonTable.storeDragon(dragon);
  })
  .then(({ dragonId }) => {
    dragon.dragonId = dragonId;

    return AccountDragonTable.storeAccountDragon({ accountId, dragonId });
  })
  .then(() => {
    res.json({ dragon });
  })
  .catch(error => next(error)); // Pass any errors to the error handling middleware.

});

router.put("/update", (req, res, next) => {

  const { dragonId, nickname, isPublic, saleValue } = req.body;

  DragonTable.updateDragon({ dragonId, nickname, isPublic, saleValue })
  .then(() => res.json({ message: "Dragon updated!" }))
  .catch(error => next(error));

});

router.get("/public-dragons", (req, res, next) => {

  getPublicDragons()
  .then(({ dragons }) => {
    res.json({ dragons });
  })
  .catch(error => {
    console.error(error);
    next(error)
  });

});


module.exports = router;