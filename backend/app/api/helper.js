const Session = require("../account/session.js");
const AccountTable = require("../account/table.js");
const { hash } = require("../account/helper.js");

const setSession = ({ username, res }) => {
  return new Promise((resolve, reject) => {
    const session = new Session({ username });

    const sessionString = session.toString();

    AccountTable.updateSessionId({
      sessionId: session.id,
      usernameHash: hash(username),
    }).then(() => {
      res.cookie("sessionString", sessionString, {
        expire: Date.now() + 3600000, // cookie expires in 1 hour
        httpOnly: true, // cookie cannot be accessed by client side javascript
        // secure: true // use with https cookie can only be sent over https connections
      });
      resolve({ message: "Yay! Session created!"});
    })
    .catch(error => reject(error));
  });
};

const setSessionCookie = ({ sessionString, res }) => {
  res.cookie('sessionString', sessionString, {
    expire: Date.now() + 3600000,
    httpOnly: true
    // secure: true // use with https
  });
};

const authenticatedAccount = ({ sessionString }) => {
  return new Promise((resolve, reject) => {
    if (!sessionString || !Session.verify(sessionString)) {
      const error = new Error('Invalid session');

      error.statusCode = 400;

      return reject(error);
    } else {
      const { username, id } = Session.parse(sessionString);

      AccountTable.getAccount({ usernameHash: hash(username) })
        .then(({ account }) => {
          const authenticated = account.sessionId === id;

          resolve({ account, authenticated, username });
        })
        .catch(error => reject(error));
    }
  });
};

module.exports = { setSession, authenticatedAccount };




