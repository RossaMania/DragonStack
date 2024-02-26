const TRAITS = require("../data/traits.json");

const DEFAULT_PROPERTIES = {
  nickname: "unnamed",

  generationId: undefined,

  get birthdate() {
    return new Date();
  },

  get randomTraits() {
    const traits = [];

    TRAITS.forEach(TRAIT => {
      const traitType = TRAIT.type; // type of trait
      const traitValues = TRAIT.values; // Array of trait values

      const traitValue =
        traitValues[Math.floor(Math.random() * traitValues.length)]; // Randomly select a trait value from the array of trait values

      traits.push({ traitType, traitValue }); // Push the trait type and value to the traits array
    });

    return traits;
  }
};

class Dragon {
  constructor({ birthdate, nickname, traits, generationId } = {}) {
    this.birthdate = birthdate || DEFAULT_PROPERTIES.birthdate;
    this.nickname = nickname || DEFAULT_PROPERTIES.nickname;
    this.traits = traits || DEFAULT_PROPERTIES.randomTraits;
    this.generationId = generationId || DEFAULT_PROPERTIES.generationId;
  }
}

module.exports = Dragon;