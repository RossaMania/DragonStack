const pool = require("../../databasePool.js");

class GenerationTable {
  static storeGeneration(generation) {
    pool.query(
      'INSERT INTO generation(expiration) VALUES($1) RETURNING id', // $1 is a placeholder for the value of generation.expiration in the array that follows the SQL query string
      [generation.expiration], // The value of generation.expiration
      (error, response) => {
        if (error) return console.error(error);

        const generationId = response.rows[0].id;

        return generationId;
      }
      );
    }
}

module.exports = GenerationTable; // Export the GenerationTable class