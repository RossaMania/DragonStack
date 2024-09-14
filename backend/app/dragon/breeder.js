const base64 = require("base-64");
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
    // If matronTrait and patronTrait are the same, return matronTrait
    if (matronTrait === patronTrait) return matronTrait;

    // Encode traits to base64 and calculate their character sums
    const matronTraitCharSum = Breeder.charSum(base64.encode(matronTrait));
    const patronTraitCharSum = Breeder.charSum(base64.encode(patronTrait));

    // Generate a random number within the range of the combined character sums
    const randomNum = Math.floor(Math.random() * (matronTraitCharSum + patronTraitCharSum));

    // Return matronTrait if randomNum is less than matronTraitCharSum, otherwise return patronTrait
    return randomNum < matronTraitCharSum ? matronTrait : patronTrait;
  }

  static charSum(string) {
    // Calculate the sum of character codes for the given string
    return string.split("").reduce((sum, character) => sum += character.charCodeAt(), 0);
  }
}

module.exports = Breeder;