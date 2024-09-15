const { Router } = require("express");
const DragonTable = require("../dragon/table.js");
const AccountTable = require("../account/table.js");
const AccountDragonTable = require("../accountDragon/table.js");
const Breeder = require("../dragon/breeder.js");
const { authenticatedAccount } = require("./helper.js");
const { getPublicDragons, getDragonWithTraits } = require("../dragon/helper.js");

const router = new Router();

// Route to create a new dragon
router.get("/new", (req, res, next) => {
  let accountId, dragon;

  // Authenticate the account using the session string from cookies
  authenticatedAccount({ sessionString: req.cookies.sessionString })
  .then(({ account }) => {
    accountId = account.id;

    // Get a new dragon instance from the generation engine
    dragon = req.app.locals.engine.generation.newDragon();

    // Store the new dragon in the database
    return DragonTable.storeDragon(dragon);
  })
  .then(({ dragonId }) => {
    dragon.dragonId = dragonId;

    // Associate the new dragon with the authenticated account
    return AccountDragonTable.storeAccountDragon({ accountId, dragonId });
  })
  .then(() => {
    // Respond with the newly created dragon
    res.json({ dragon });
  })
  .catch(error => next(error)); // Pass any errors to the error handling middleware
});

// Route to update an existing dragon
router.put("/update", (req, res, next) => {
  const { dragonId, nickname, isPublic, saleValue, sireValue } = req.body;
  console.log("Received PUT request to update dragon:", { dragonId, nickname, isPublic, saleValue, sireValue });

  // Update the dragon's details in the database
  DragonTable.updateDragon({ dragonId, nickname, isPublic, saleValue, sireValue })
  .then(() => res.json({ message: "Dragon updated!" }))
  .catch(error => next(error)); // Pass any errors to the error handling middleware
});

// Route to get all public dragons
router.get("/public-dragons", (req, res, next) => {
  // Fetch all public dragons from the database
  getPublicDragons()
  .then(({ dragons }) => {
    // Respond with the list of public dragons
    res.json({ dragons });
  })
  .catch(error => {
    console.error(error);
    next(error); // Pass any errors to the error handling middleware
  });
});

// Route to buy a dragon
router.post("/buy", (req, res, next) => {
  const { dragonId, saleValue } = req.body;
  let buyerId;

  // Fetch the dragon details from the database
  DragonTable.getDragon({ dragonId })
    .then(dragon => {
      if (dragon.saleValue !== saleValue) {
        throw new Error("Oops! Sale value is not correct!");
      }

      if (!dragon.isPublic) {
        throw new Error("Oops! Dragon must be public!");
      }

      // Authenticate the account using the session string from cookies
      return authenticatedAccount({ sessionString: req.cookies.sessionString });
    })
    .then(({ account, authenticated }) => {
      if (!authenticated) {
        throw new Error("Unauthenticated!");
      }

      if (saleValue > account.balance) {
        throw new Error("Oops! Sale value exceeds account balance!");
      }

      buyerId = account.id;

      // Fetch the account details of the dragon's current owner
      return AccountDragonTable.getDragonAccount({ dragonId });
    })
    .then(({ accountId }) => {
      if (accountId === buyerId) {
        throw new Error("Oops! Cannot buy your own dragon!");
      }

      const sellerId = accountId;

      // Perform the transaction: update balances and transfer dragon ownership
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
      ]);
    })
    .then(() => res.json({ message: "Transaction successful!" }))
    .catch(error => {
      console.error(error);
      next(error); // Pass any errors to the error handling middleware
    });
});

// Route to breed two dragons
router.post("/mate", (req, res, next) => {
  const { matronDragonId, patronDragonId } = req.body;

  if (matronDragonId === patronDragonId) {
    throw new Error("Oops! Cannot breed with the same dragon!");
  }

  let matronDragon, patronDragon, patronSireValue;
  let matronAccountId, patronAccountId;

  // Fetch the details of the patron dragon
  getDragonWithTraits({ dragonId: patronDragonId })
  .then(dragon => {
    if (!dragon.isPublic) {
      throw new Error("Oops! Dragon must be public!");
    }

    patronDragon = dragon;
    patronSireValue = dragon.sireValue;

    // Fetch the details of the matron dragon
    return getDragonWithTraits({ dragonId: matronDragonId });
  })
  .then(dragon => {
    matronDragon = dragon;

    // Authenticate the account using the session string from cookies
    return authenticatedAccount({ sessionString: req.cookies.sessionString });
  })
  .then(({ account, authenticated }) => {
    if (!authenticated) {
      throw new Error("Oops! Unauthenticated!");
    }

    if (patronSireValue > account.balance) {
      throw new Error("Oops! Sire value exceeds account balance!");
    }

    matronAccountId = account.id;

    // Fetch the account details of the patron dragon's owner
    return AccountDragonTable.getDragonAccount({ dragonId: patronDragonId });
  })
  .then(({ accountId }) => {
    patronAccountId = accountId;

    if (matronAccountId === patronAccountId) {
      throw new Error("Oops! Cannot breed your own dragons!");
    }

    // Breed a new dragon using the matron and patron dragons
    const dragon = Breeder.breedDragon({ matron: matronDragon, patron: patronDragon });

    // Store the new dragon in the database
    return DragonTable.storeDragon(dragon);
  })
  .then(({ dragonId }) => {
    // Perform the transaction: update balances and associate the new dragon with the matron's account
    Promise.all([
      AccountTable.updateBalance({
        accountId: matronAccountId, value: -patronSireValue
      }),
      AccountTable.updateBalance({
        accountId: patronAccountId, value: patronSireValue
      }),
      AccountDragonTable.storeAccountDragon({
        dragonId, accountId: matronAccountId
      })
    ])
    .then(() => res.json({ message: "Yay! Breed successful!" }))
    .catch(error => {
      console.error(error);
      next(error); // Pass any errors to the error handling middleware
    });
  });
});

module.exports = router;


// const { Router } = require("express");
// const DragonTable = require("../dragon/table.js");
// const AccountTable = require("../account/table.js");
// const AccountDragonTable = require("../accountDragon/table.js");
// const Breeder = require("../dragon/breeder.js");
// const { authenticatedAccount } = require("./helper.js");
// const { getPublicDragons, getDragonWithTraits } = require("../dragon/helper.js");

// const router = new Router();

// router.get("/new", (req, res, next) => {

//   let accountId, dragon;

//   authenticatedAccount({ sessionString: req.cookies.sessionString })
//   .then(({ account }) => {
//     accountId = account.id;

//     dragon = req.app.locals.engine.generation.newDragon(); // Get a new dragon instance from the generation engine.

//     return DragonTable.storeDragon(dragon);
//   })
//   .then(({ dragonId }) => {
//     dragon.dragonId = dragonId;

//     return AccountDragonTable.storeAccountDragon({ accountId, dragonId });
//   })
//   .then(() => {
//     res.json({ dragon });
//   })
//   .catch(error => next(error)); // Pass any errors to the error handling middleware.

// });

// router.put("/update", (req, res, next) => {

//   const { dragonId, nickname, isPublic, saleValue, sireValue } = req.body;
//   console.log("Received PUT request to update dragon:", { dragonId, nickname, isPublic, saleValue, sireValue });

//   DragonTable.updateDragon({ dragonId, nickname, isPublic, saleValue, sireValue })
//   .then(() => res.json({ message: "Dragon updated!" }))
//   .catch(error => next(error));

// });

// router.get("/public-dragons", (req, res, next) => {

//   getPublicDragons()
//   .then(({ dragons }) => {
//     res.json({ dragons });
//   })
//   .catch(error => {
//     console.error(error);
//     next(error)
//   });

// });

// router.post("/buy", (req, res, next) => {
//   const { dragonId, saleValue } = req.body;
//   let buyerId;

//   DragonTable.getDragon({ dragonId })
//     .then(dragon => {
//       if (dragon.saleValue !== saleValue) {
//         throw new Error("Oops! Sale value is not correct!");
//       }

//       if (!dragon.isPublic) {
//         throw new Error("Oops! Dragon must be public!")
//       }

//       return authenticatedAccount({ sessionString: req.cookies. sessionString });
//     })
//     .then(({ account, authenticated }) => {
//       if (!authenticated) {
//         throw new Error("Unauthenticated!")
//       }

//       if (saleValue > account.balance) {
//         throw new Error("Oops! Sale value exceeds account balance!")
//       }

//       buyerId = account.id;

//       return AccountDragonTable.getDragonAccount({ dragonId });
//     })
//     .then(({ accountId }) => {
//       if (accountId === buyerId) {
//         throw new Error("Oops! Cannot buy your own dragon!");
//       }

//       const sellerId = accountId;

//       return Promise.all([
//         AccountTable.updateBalance({
//           accountId: buyerId, value: -saleValue
//         }),
//         AccountTable.updateBalance({
//           accountId: sellerId, value: saleValue
//         }),
//         AccountDragonTable.updateDragonAccount({
//           dragonId, accountId: buyerId
//         }),
//         DragonTable.updateDragon({
//           dragonId, isPublic: false
//         })
//       ])
//     })
//     .then(() => res.json({ message: "Transaction successful!" }))
//     .catch(error => {
//       console.error(error);
//       next(error)
//     });
//   });

//   router.post("/mate", (req, res, next) => {
//     const { matronDragonId, patronDragonId } = req.body;

//     if (matronDragonId === patronDragonId) {
//       throw new Error("Oops! Cannot breed with the same dragon!");
//     }

//     let matronDragon, patronDragon, patronSireValue;
//     let matronAccountId, patronAccountId;

//     getDragonWithTraits({ dragonId: patronDragonId })
//     .then(dragon => {
//       if (!dragon.isPublic) {
//         throw new Error("Oops! Dragon must be public!");
//       }

//       patronDragon = dragon;
//       patronSireValue = dragon.sireValue;

//       return getDragonWithTraits({ dragonId: matronDragonId });
//     })
//     .then(dragon => {
//       matronDragon = dragon;

//       return authenticatedAccount({ sessionString: req.cookies.sessionString });

//   })
//   .then(({ account, authenticated }) => {
//     if (!authenticated) {
//       throw new Error("Oops! Unauthenticated!");
//     }

//     if (patronSireValue > account.balance) {
//       throw new Error("Oops! Sire value exceeds account balance!");
//     }

//     matronAccountId = account.id;

//     return AccountDragonTable.getDragonAccount({ dragonId: patronDragonId });
//   })
//   .then(({ accountId}) => {
//     patronAccountId = accountId;

//     if (matronAccountId === patronAccountId) {
//       throw new Error("Oops! Cannot breed your own dragons!");
//     }

//     const dragon = Breeder.breedDragon({ matron: matronDragon, patron: patronDragon });

//     return DragonTable.storeDragon(dragon);
//   })
//   .then(({ dragonId }) => {
//     Promise.all([
//       AccountTable.updateBalance({
//         accountId: matronAccountId, value: -patronSireValue
//       }),
//       AccountTable.updateBalance({
//         accountId: patronAccountId, value: patronSireValue
//       }),
//       AccountDragonTable.storeAccountDragon({
//         dragonId, accountId: matronAccountId
//       })
//     ])
//     .then(() => res.json({ message: "Yay! Breed successful!" }))
//     .catch(error => {
//       console.error(error);
//       next(error)
//     });
//   })
// });

// module.exports = router;