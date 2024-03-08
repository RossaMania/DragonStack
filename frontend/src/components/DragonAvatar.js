import React from "react";
import {
  patchy,
  plain,
  skinny,
  slender,
  sporty,
  spotted,
  stocky,
  striped,
} from "../assets/index.js";

const propertyMap = {
  backgroundColor: {
    black: "#000000",
    white: "#ffffff",
    green: "#00ff00",
    blue: "#0000ff",
    red: "#ff0000",
    yellow: "#ffff00",
    purple: "#800080",
    orange: "#ffa500",
    brown: "#a52a2a",
  },
  build: {
    patchy,
    plain,
    skinny,
    slender,
    sporty,
    spotted,
    stocky,
    striped,
    average,
    stocky,
    muscular,
    fat
  },
  pattern: {
    plain,
    solid,
    striped,
    dotted,
    patchy,
    checkered,
    plaid,
  },
  size: {
    tiny: 100,
    small: 140,
    medium: 180,
    large: 220,
    huge: 260,
    enormous: 360,
  },
};

const DragonAvatar = ({ dragon }) => {
  return (
    <div>
      <span>Generation:{dragon.generationId}.</span>
      <span>ID:{dragon.dragonId}.</span>

      {dragon.traits.map((trait) => trait.traitValue).join(", ")}
    </div>
  );
};

export default DragonAvatar;
