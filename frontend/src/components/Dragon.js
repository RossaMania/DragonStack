import React from "react";
import { Button } from "react-bootstrap";
import DragonAvatar from "./DragonAvatar";
import { useFetchDragonQuery } from "../slices/dragonSlice";

const Dragon = () => {
  const { data: dragon, error, isLoading, refetch } = useFetchDragonQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>This is a Dragon</h3>
      <DragonAvatar dragon={dragon} />
      <Button onClick={refetch}>New Dragon!</Button>
    </div>
  );
};

export default Dragon;

//The previous dragon component without Redux Toolkit Query
// import React, { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
// import DragonAvatar from "./DragonAvatar";

// const DEFAULT_DRAGON = {
//   dragonId: "",
//   generationId: "",
//   nickname: "",
//   birthdate: "",
//   traits: [],
// };

// const Dragon = () => {
//   const [dragon, setDragon] = useState(DEFAULT_DRAGON);

//   useEffect(() => {
//     fetchDragon();
//   }, []);

//   const fetchDragon = () => {
//     fetch("http://localhost:3000/dragon/new")
//       .then((response) => response.json())
//       .then((json) => setDragon(json.dragon))
//       .catch((error) => console.error("error", error));
//   };

//   return (
//     <div>
//       <h3>This is a Dragon</h3>
//       <DragonAvatar dragon={dragon} />
//       <Button onClick={fetchDragon}>New Dragon!</Button>
//     </div>
//   );
// };

// export default Dragon;
