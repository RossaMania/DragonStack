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

module.exports = { setSession };