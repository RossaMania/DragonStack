const { Router } = require("express");
const AccountTable = require("../account/table.js");
const AccountDragonTable = require("../accountDragon/table.js");
const Session = require("../account/session.js");
const { hash } = require("../account/helper.js");
const { setSession, authenticatedAccount } = require("./helper.js");
const { getDragonWithTraits } = require("../dragon/helper.js");

const router = new Router();

router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;
  const usernameHash = hash(username);
  const passwordHash = hash(password);

  AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
      if (!account) {
        return AccountTable.storeAccount({ usernameHash, passwordHash });
      } else {
        const error = new Error("Oops! Username already exists!");
        error.statusCode = 409;

        throw error;
      }
    })
    .then(() => {
      return setSession({ username, res });
    })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.post("/login", (req, res, next) => {
const { username, password } = req.body;

AccountTable.getAccount({ usernameHash: hash(username) })
.then(({ account }) => {
  if (account && account.passwordHash === hash(password)) {

    const { sessionId } = account;

    return setSession({ username, res, sessionId })
  } else {
    const error = new Error("Oops! Incorrect username or password!");

    error.statusCode = 409;

    throw error;
  }
})
.then(({ message }) => res.json({ message }))
.catch(error => next(error));
});

router.post("/logout", (req, res, next) => {
  const { username } = Session.parse(req.cookies.sessionString);

  AccountTable.updateSessionId({
    sessionId: null,
    usernameHash: hash(username)
  })
  .then(() => {
    res.clearCookie('sessionString');

    res.json({ message: "Logout successful! Yay!" });
  })
  .catch(error => next(error));
});

router.get("/authenticated", (req, res, next) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
  .then(({ authenticated }) => res.json({ authenticated }))
  .catch(error => next(error));

});

router.get("/dragons", (req, res, next) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
  .then(({ account }) => {
    return AccountDragonTable.getAccountDragons({
      accountId: account.id
    })
  })
  .then(({ accountDragons }) => {
    console.log(`Account dragons for accountId ${account.id}:`, accountDragons); // Debugging line
    return Promise.all(
      accountDragons.map(accountDragon => {
        return getDragonWithTraits({ dragonId: accountDragon.dragonId });
      })
    );
  })
    .then(dragons => {
      console.log('Dragons retrieved:', dragons); // Debugging line
      res.json({ dragons })
    })
  .catch(error => next(error));
});

module.exports = router;