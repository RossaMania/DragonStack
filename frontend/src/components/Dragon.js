import React, { useEffect, useState } from "react";

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
      <span>Generation:{dragon.generationId}.</span>
      <span>ID:{dragon.dragonId}.</span>

      {dragon.traits.map(trait => trait.traitValue).join(", ")}
    </div>
  );

}

export default Dragon;