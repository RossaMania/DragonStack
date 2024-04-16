import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import DragonAvatar from "./DragonAvatar";
import { useFetchDragonQuery } from "../slices/dragonApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectDragon } from "../slices/dragonSlice";

const Dragon = () => {
  const dispatch = useDispatch();
  const { data: dragon, error, isLoading, refetch } = useFetchDragonQuery();
  console.log(dragon);
  const selectedDragon = useSelector((state) => state.dragon.selectedDragon);

  useEffect(() => {
    if (dragon) {
      console.log(dragon);
      dispatch(selectDragon(dragon));
    }
  }, [dragon, dispatch]);

  const handleCreateDragon = () => {
    console.log(isLoading, error);
    refetch();
  };

  console.log("Dragon in parent component:", dragon);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>This is a Dragon</h3>
      {selectedDragon && <DragonAvatar dragon={selectedDragon.dragon} />}
      <Button onClick={handleCreateDragon}>New Dragon!</Button>
    </div>
  );
};

export default Dragon;




// import React from "react";
// import { Button } from "react-bootstrap";
// import DragonAvatar from "./DragonAvatar";
// import { useFetchDragonQuery } from "../slices/dragonApiSlice";

// const Dragon = () => {
//   const { data: dragon, error, isLoading, refetch } = useFetchDragonQuery();

//   const handleCreateDragon = () => {
//     refetch();
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       <h3>This is a Dragon</h3>
//       <DragonAvatar dragon={dragon} />
//       <Button onClick={handleCreateDragon}>New Dragon!</Button>
//     </div>
//   );
// };

// export default Dragon;



// import React from "react";
// import { Button } from "react-bootstrap";
// import DragonAvatar from "./DragonAvatar";
// import {
//   useFetchDragonQuery,
//   useCreateDragonMutation,
// } from "../slices/dragonApiSlice";

// const Dragon = () => {
//   const { data: dragon, error, isLoading, refetch } = useFetchDragonQuery();
//   const [createDragon] = useCreateDragonMutation();

//   const handleCreateDragon = async () => {
//     try {
//       await createDragon({
//         dragonId: "",
//         generationId: "",
//         nickname: "",
//         birthdate: "",
//         traits: [],
//       }); // Pass any necessary data for the new dragon here
//       refetch();
//     } catch (error) {
//       console.error("Error creating dragon:", error);
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       <h3>This is a Dragon</h3>
//       <DragonAvatar dragon={dragon} />
//       <Button onClick={handleCreateDragon}>New Dragon!</Button>
//     </div>
//   );
// };

// export default Dragon;

//The previous dragon component just using the useFetchDragonQuery--no mutation.
// import React from "react";
// import { Button } from "react-bootstrap";
// import DragonAvatar from "./DragonAvatar";
// import { useFetchDragonQuery } from "../slices/dragonApiSlice";

// const Dragon = () => {
//   const { data: dragon, error, isLoading, refetch } = useFetchDragonQuery();

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       <h3>This is a Dragon</h3>
//       <DragonAvatar dragon={dragon} />
//       <Button onClick={refetch}>New Dragon!</Button>
//     </div>
//   );
// };

// export default Dragon;

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
