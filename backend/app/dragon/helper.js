const pool = require("../../databasePool.js");
const DragonTable = require("./table.js");

const getDragonWithTraits = ({ dragonId }) => {

return Promise.all([
  DragonTable.getDragon({ dragonId})
]);

};

export default getDragonWithTraits;