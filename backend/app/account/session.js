const { v4: uuidv4 } = require("uuid");
const { hash } = require("./helper.js");

const SEPARATOR = "|";

class Session {
  constructor({ username }) {

    this.username = username;
    this.id = uuidv4();

  }

  toString() {

    const { username, id } = this;

    return Session.sessionString({ username, id });

  }

  static accountData({ username, id}) {

    return `${username}${SEPARATOR}${id}`;
  }

  static sessionString({ username, id }) {

    const accountData = Session.accountData({ username, id });

    return `${accountData}${SEPARATOR}${hash(accountData)}`;
  }
}

module.exports = Session;