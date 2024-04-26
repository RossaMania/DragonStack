const { Router } = require("express");

const AccountTable = require("../account/table.js");

const { hash } = require("../account/helper.js");

const Session = require("../account/session.js");

const router = new Router();



router.post("/signup", (req, res, next) => {
const { username, password } = req.body;
const usernameHash = hash(username);
const passwordHash = hash(password);

AccountTable.getAccount({ usernameHash })
.then(({ account }) => {
  if (!account) {
    return AccountTable.storeAccount({ usernameHash, passwordHash })
  } else {
    const error = new Error("Oops! Username already exists!");
    error.statusCode = 409;

    throw(error);
  }
})
.then(() => {
  const session = new Session({ username });

  const sessionString = session.toString();

  res.cookie("sessionString", sessionString, {
    expire: Date.now() + 3600000, // cookie expires in 1 hour
    httpOnly: true, // cookie cannot be accessed by client side javascript
    // secure: true // use with https cookie can only be sent over https connections
  });

  res.json({ message: "Success!" })
})
.catch(error => next(error));

});

module.exports = router;