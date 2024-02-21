const Generation = require("./generation.js");

class GenerationEngine {
  constructor() {
    this.generation = null; // The current generation object
  }

  start() {
    this.buildNewGeneration();
  }

  buildNewGeneration() {
    this.generation = new Generation();

    console.log("new generation", this.generation);

    setTimeout(() => this.buildNewGeneration(),
    this.generation.expiration.getTime() - Date.now()); // Time until the generation expires in milliseconds
  }
}