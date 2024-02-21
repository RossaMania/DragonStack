// const Dragon = require("./dragon.js");

// const fooey = new Dragon({
//   birthdate: new Date(),
//   nickname: "fooey"
// });

// const baloo = new Dragon({
//   birthdate: new Date(),
//   nickname: "baloo",
//   traits: [
//     { traitType: "backgroundColor", traitValue: "green" }
//   ]
// });


// const mimar = new Dragon();

// setTimeout(() => {
//   const gooby = new Dragon();
//   console.log("gooby", gooby);
// }, 3000);


// console.log("fooey", fooey);

// console.log("baloo", baloo);

// console.log("mimar", mimar);



// const Generation = require("./generation.js");

// const generation = new Generation();

// console.log("generation", generation);

// const gooby = generation.newDragon(); // This will throw an error because the generation has expired

// console.log("gooby", gooby);

// setTimeout(() => {
//   const mimar = generation.newDragon();
//   console.log("mimar", mimar);
// }, 15000);

const express = require("express");
const GenerationEngine = require("./generation/engine.js");
const dragonRouter = require("./api/dragon.js");
const generationRouter = require("./api/generation.js");

const app = express();
const engine = new GenerationEngine();

app.locals.engine = engine; // Set the engine object on the app.locals object to be used in the dragonRouter.

app.use("/dragon", dragonRouter);

app.use("/generation", generationRouter);

engine.start();

module.exports = app; // Export the app object to be used in the tests.