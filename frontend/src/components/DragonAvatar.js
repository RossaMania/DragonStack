import React from "react";

import { patchy, plain, skinny, slender, sporty, spotted, stocky, striped } from "../assets";
import Loader from "./Loader";

const propertyMap = {
  backgroundColor: {
    black: "#263238",
      white: "#cfd8dc",
      green: "#a5d6a7",
      blue: "#0277bd",
      red: "#ef5350",
      yellow: "#fff176",
      purple: "#ba68c8",
      orange: "#ff7043",
      brown: "#8d6e63"
    },
  build: {
    skinny,
    slender,
    sporty,
    stocky,
  },

  pattern: {
    plain,
    striped,
    spotted,
    patchy
  },

  size: {
    tiny: 80,
      small: 200,
      medium: 280,
      large: 360,
      huge: 440,
      enormous: 560
    }
};


const DragonAvatar = ({ dragon }) => {

  console.log("Dragon:", dragon); // Add this line to check the value of dragon

  if (!dragon || !Array.isArray(dragon.traits)) { // Check if dragon or dragon.traits is undefined or not an array
    console.log("Oops! Dragon or dragon traits are undefined!"); // Add this line to check if dragon or dragon.traits is undefined
    return <Loader />;
  }

  const dragonPropertyMap = {};

  dragon.traits.forEach((trait) => {

    const { traitType, traitValue } = trait;

    dragonPropertyMap[traitType] = propertyMap[traitType][traitValue];
  });

  console.log("Dragon property map:", dragonPropertyMap); // Add this line to check the value of dragonPropertyMap

  const { backgroundColor, build, pattern, size } = dragonPropertyMap;

  const sizing = { width: size, height: size };

  return (
    <div className="dragon-avatar-image-wrapper">
      <div
        className="dragon-avatar-image-background"
        style={{ backgroundColor, ...sizing }}
      ></div>
      <img
        src={pattern}
        className="dragon-avatar-image-pattern"
        style={{ ...sizing }}
      />
      <img src={build} className="dragon-avatar-image" style={{ ...sizing }} />
    </div>
  );
};

export default DragonAvatar;