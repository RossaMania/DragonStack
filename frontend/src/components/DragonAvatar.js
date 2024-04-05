import { patchy, plain, skinny, slender, sporty, spotted, stocky, striped } from "../assets";

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

  if (!dragon) return <div>Loading...</div>;
  
  const dragonPropertyMap = {};

  dragon.traits.forEach((trait) => {
    const { traitType, traitValue } = trait;
    dragonPropertyMap[traitType] = propertyMap[traitType][traitValue];
  });

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