const Generation = require("./index.js");

const GenerationTable = require("./table.js");

class GenerationEngine {
  constructor() {
    this.generation = null; // The current generation object
    this.timer = null; // The timer that will build the new generation. Timer object set to null.
  }

  start() {
    this.buildNewGeneration();
  }

  stop() {
    clearTimeout(this.timer);
  }

  buildNewGeneration() {
    this.generation = new Generation();

    GenerationTable.StoreGeneration(this.generation); // Store the new generation in the database

    console.log("new generation", this.generation);

    this.timer = setTimeout(() => this.buildNewGeneration(),
    this.generation.expiration.getTime() - Date.now()); // Time until the generation expires in milliseconds
  }
}

module.exports = GenerationEngine;