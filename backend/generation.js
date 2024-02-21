const { REFRESH_RATE, SECONDS } = require("./config");

const refreshRate = REFRESH_RATE * SECONDS;

class Generation {
  constructor() {

    this.expiration = this.calculateExpiration();

  }

  calculateExpiration() {

    const expirationPeriod = Math.floor(Math.random() * (refreshRate / 2)); // Random whole number between 0 and refreshRate/2

    // If random number is less than 0.5, then refreshRate - expirationPeriod. Otherwise, refreshRate + expirationPeriod
    const msUntilExpiration =
      Math.random() < 0.5
        ? refreshRate - expirationPeriod
        : refreshRate + expirationPeriod;

    return new Date(Date.now() + msUntilExpiration);

  }
}