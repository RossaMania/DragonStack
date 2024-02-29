const pool = require("../../databasePool.js");

class TraitTable {
  static getTraitId = ({ traitType, traitValue }) => {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT id FROM trait WHERE "traitType" = $1 AND "traitValue" = $2',
        [traitType, traitValue],
        (error, response) => {
          if (error) {
            console.error("Error executing query:", error);
            return reject(error);
          }

          console.log("Query response:", response);

          if (!response.rows || response.rows.length === 0) {
            // No matching rows found
            console.log("No matching rows found");
            resolve({ traitId: null });
          } else {
            console.log("Matching rows found:", response.rows);
            resolve({ traitId: response.rows[0].id });
          }
        }
      );
    });
  };
}

// TraitTable.getTraitId({ traitType: "backgroundColor", traitValue: "green" })
//   .then(({ traitId }) => {
//     if (traitId !== null) {
//       console.log("traitId", traitId);
//     } else {
//       console.log("No matching trait found");
//     }
//   })
//   .catch((error) => console.error("error", error));

module.exports = TraitTable; // Export the TraitTable class.
