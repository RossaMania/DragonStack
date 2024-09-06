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
  console.log("Received PUT request to update dragon:", { dragonId, nickname, isPublic, saleValue });

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

router.post("/buy", (req, res, next) => {
  const { dragonId, saleValue } = req.body;
  let buyerId;

  DragonTable.getDragon({ dragonId })
    .then(dragon => {
      if (dragon.saleValue !== saleValue) {
        throw new Error("Oops! Sale value is not correct!");
      }

      if (!dragon.isPublic) {
        throw new Error("Oops! Dragon must be public!")
      }

      return authenticatedAccount({ sessionString: req.cookies. sessionString });
    })
    .then(({ account, authenticated }) => {
      if (!authenticated) {
        throw new Error("Unauthenticated!")
      }

      if (saleValue > account.balance) {
        throw new Error("Oops! Sale value exceeds account balance!")
      }

      buyerId = account.id;

      return AccountDragonTable.getDragonAccount({ dragonId });
    })
    .then(({ accountId }) => {
      if (accountId === buyerId) {
        throw new Error("Oops! Cannot buy your own dragon!");
      }

      const sellerId = accountId;

      return Promise.all([
        AccountTable.updateBalance({
          accountId: buyerId, value: -saleValue
        }),
        AccountTable.updateBalance({
          accountId: sellerId, value: saleValue
        }),
        AccountDragonTable.updateDragonAccount({
          dragonId, accountId: buyerId
        }),
        DragonTable.updateDragon({
          dragonId, isPublic: false
        })
      ])
    })
    .then(() => res.json({ message: "Transaction successful!" }))
    .catch(error => next(error));
});


module.exports = router;