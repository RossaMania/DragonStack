const Dragon = require("./index");

class Breeder {
  // Static method to breed a new dragon from a matron and patron
  static breedDragon({ matron, patron }) {
    // Extract traits from matron and patron
    const matronTraits = matron.traits;
    const patronTraits = patron.traits;

    // Array to hold the baby dragon traits
    const babyTraits = [];

    // Iterate over each trait of the matron
    matronTraits.forEach(({ traitType, traitValue }) => {
      // Get the trait value from the matron
      const matronTrait = traitValue;

      // Find the corresponding trait value from the patron
      const patronTrait = patronTraits.find(
        trait => trait.traitType === traitType
      ).traitValue;

      // Push the new trait to the babyTraits array
      babyTraits.push({
        traitType,
        traitValue: Breeder.pickTrait({ matronTrait, patronTrait }) // Pick a trait from matron and patron
      });
    });

    // Return a new Dragon instance with the baby traits
    return new Dragon({ nickname: "Unnamed baby", traits: babyTraits });
  }
  static pickTrait({ matronTrait, patronTrait }) {
    // If matronTrait and patronTrait are the same, return either one
    if (matronTrait === patronTrait) return matronTrait;

    // If matronTrait and patronTrait are different, return either one randomly
    if (Math.random() > 0.5) return matronTrait;
    return patronTrait;
  }
}

module.exports = Breeder;