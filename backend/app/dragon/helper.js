const pool = require("../../databasePool.js");
const DragonTable = require("./table.js");
const Dragon = require("./index.js");

const getDragonWithTraits = ({ dragonId }) => {

return Promise.all([
  DragonTable.getDragon({ dragonId}),
  new Promise((resolve, reject) => {
    pool.query(
      `SELECT "traitType", "traitValue"
      FROM trait
      INNER JOIN dragonTrait ON trait.id = dragonTrait."traitId"
      WHERE dragonTrait."dragonId" = $1`,
      [dragonId],
      (error, response) => {
        if (error) return reject(error);

        console.log(`Traits for dragonId ${dragonId}:`, response.rows); // Debugging line
        resolve(response.rows);
      }
    )
  })
])
.then(([dragon, dragonTraits]) => {

  console.log(`Dragon details for dragonId ${dragonId}:`, dragon); // Debugging line
  return new Dragon({ ...dragon, dragonId, traits: dragonTraits });

})
.catch(error => console.error(error));
};

// getDragonWithTraits({ dragonId: 1 })
//   .then(dragon => console.log("dragon", dragon))
//   .catch(error => console.error("error", error)); // for debugging

module.exports = { getDragonWithTraits };