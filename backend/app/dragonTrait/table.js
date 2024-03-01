const pool = require("../../databasePool.js");
const TraitTable = require("../trait/table.js");

class DragonTraitTable {
  static storeDragonTrait({ dragonId, traitType, traitValue }) {

    return new Promise((resolve, reject) => {
      TraitTable.getTraitId({ traitType, traitValue })
      .then(({ traitId }) => {
        pool.query(
          `INSERT INTO dragonTrait("traitId", "dragonId")
          VALUES($1, $2)`,
          [traitId, dragonId], //Array of values to insert into the SQL query
          (error, response) => {
            if (error) return reject(error);
            resolve(); // No need to return anything, just resolve to end promise
          }
      )
      })
    });
  }
}

module.exports = DragonTraitTable;