import React, { useEffect, useState } from "react";
import DragonAvatar from "./DragonAvatar";

const Dragon = ({ dragon: dragonProp }) => {
  const [dragon, setDragon] = useState({
    dragonId: "",
    generationId: "",
    nickname: "",
    birthdate: "",
    traits: []
  });

  useEffect(() => {

     const fetchDragon = () => {
       fetch("http://localhost:3000/dragon/new")
         .then((response) => response.json())
         .then((json) => setDragon(json.dragon))
         .catch((error) => console.error("error", error));
     };

      fetchDragon();

  }, []);

  return (
    <div>
      <h3>This is a Dragon</h3>
      <DragonAvatar dragon={dragon} />
    </div>
  );

}

export default Dragon;