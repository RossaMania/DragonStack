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



const Generation = require("./generation.js");

const generation = new Generation();

console.log("generation", generation);

const gooby = generation.newDragon(); // This will throw an error because the generation has expired

console.log("gooby", gooby);

setTimeout(() => {
  const mimar = generation.newDragon();
  console.log("mimar", mimar);
}, 15000);