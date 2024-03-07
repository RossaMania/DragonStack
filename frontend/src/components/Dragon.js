import React, { useEffect, useState } from "react";
import DragonAvatar from "./DragonAvatar";

import { Button } from "react-bootstrap";

const Dragon = () => {
  const [dragon, setDragon] = useState({
    dragonId: "",
    generationId: "",
    nickname: "",
    birthdate: "",
    traits: []
  });


     const fetchDragon = () => {
       fetch("http://localhost:3000/dragon/new")
         .then((response) => response.json())
         .then((json) => setDragon(json.dragon))
         .catch((error) => console.error("error", error));
     };

  return (
    <div>
      <h3>This is a Dragon</h3>
      <DragonAvatar dragon={dragon} />
      <Button onClick={() => fetchDragon()}>New Dragon!</Button>
    </div>
  );

}

export default Dragon;