const pool = require("../../databasePool.js");

class TraitTable {
  static getTraitId = ({ traitType, traitValue }) => {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT id FROM trait WHERE "traitType" = $1 AND "traitValue" = $2',
        [traitType, traitValue],
        (error, response) => {
          if (error) return reject(error);

          const traitId = response.rows[0].id;

          resolve({ traitId: traitId });
        }
      )
    });

  }
}

module.exports = TraitTable; // Export the TraitTable class.