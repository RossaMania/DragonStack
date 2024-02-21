const Generation = require("./generation.js");

class GenerationEngine {
  constructor() {
    this.generation = null;
  }

  buildNewGeneration() {
    this.generation = new Generation();

    console.log("new generation", this.generation);
  }
}