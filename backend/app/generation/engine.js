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
    const generation = new Generation();

    GenerationTable.storeGeneration(generation) // Store the generation in the database
    .then(({ generationId }) => {
      this.generation = generation;

      this.generation.generationId = generationId;

      console.log("generationId", generationId);

      console.log("new generation", this.generation);

      this.timer = setTimeout(
        () => this.buildNewGeneration(),
        this.generation.expiration.getTime() - Date.now()
      ); // Time until the generation expires in milliseconds

    }) // Set generationId & log the generationId to the console
    .catch(error => console.error(error)) // Log the error to the console if there is one

  }
}

module.exports = GenerationEngine;