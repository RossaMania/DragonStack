import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchGenerationQuery } from "../slices/generationApiSlice";
import { setGeneration, setLoading, setError } from "../slices/generationSlice";

const Generation = () => {
  const dispatch = useDispatch();
  const { data: generation, error, isLoading } = useFetchGenerationQuery();
  const generationData = useSelector((state) => state.generation);

  useEffect(() => {
    console.log("useEffect called");

    dispatch(setLoading(true));

    console.log("Dispatched setLoading with true");

    if (generation) {

      console.log("generation is truthy:", generation);

      dispatch(setGeneration(generation));
      dispatch(setLoading(false));
      console.log("Dispatched setLoading with false");

    } else if (error) {

      console.log("generation is falsy");
      dispatch(setError(error.message));
      dispatch(setLoading(false));

    }
  }, [generation, error, dispatch]);

  console.log("Before isLoading check:", generationData);

  if (isLoading) {
    console.log("Loading state:", isLoading);
    return "Loading...";
  }

  console.log("After isLoading check:", generationData);

  if (error) {
    console.log("Error state:", error);
    return `Error: ${error.message}`;
  }

  console.log("Before rendering:", generationData);

  return (
    <div>
      <h3>Generation {generation.generation.generationId}. Expires on:</h3>
      <h4>{new Date(generation.generation.expiration).toString()}</h4>
    </div>
  );
};

export default Generation;



//This is using Redux Toolkit Query with the Query Builder
// import React, { useEffect, useState } from "react";
// import { useFetchGenerationQuery } from "../slices/generationApiSlice";

// const Generation = () => {
//   const { data: generation, error, isLoading } = useFetchGenerationQuery();
//   const [timer, setTimer] = useState(null);
//   const MINIMUM_DELAY = 3000;

//   useEffect(() => {
//     if (generation) {
//       let delay =
//         new Date(generation.expiration).getTime() - new Date().getTime();
//       if (delay < MINIMUM_DELAY) {
//         delay = MINIMUM_DELAY;
//       }

//       setTimer(
//         setTimeout(() => {
//           // This will trigger a refetch
//           window.location.reload();
//         }, delay)
//       );
//     }

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [generation, timer]);

//   if (isLoading) return "Loading...";
//   if (error) return `Error: ${error.message}`;

//   return (
//     <div>
//       <h3>Generation {generation.generationId}. Expires on:</h3>
//       <h4>{new Date(generation.expiration).toString()}</h4>
//     </div>
//   );
// };

// export default Generation;


// import React, { useEffect, useState } from "react";

// const Generation = () => {
//   const [generation, setGeneration] = useState({
//     generationId: "",
//     expiration: "",
//   });

//   const MINIMUM_DELAY = 3000;

//   let timer;

//   useEffect(() => {

//     fetchNextGeneration();

//     return () => {
//       clearTimeout(timer);
//     };
//   }, []);

//   const fetchGeneration = () => {
//     fetch("http://localhost:3000/generation")
//       .then(response => response.json())
//       .then(json => {
//         console.log("json", json);
//         setGeneration(json.generation);
//       })
//       .catch((error) => console.error("error", error));
//   };

//   const fetchNextGeneration = () => {
//     fetchGeneration();

//     let delay = new Date(generation.expiration).getTime() - new Date().getTime();

//     if (delay < MINIMUM_DELAY) {
//       delay = MINIMUM_DELAY;
//     }

//     timer = setTimeout(() => {
//       fetchNextGeneration();
//     }, delay);

//   }

//   return (
//     <div>
//       <h3>Generation {generation.generationId}. Expires on:</h3>
//       <h4>{new Date(generation.expiration).toString()}</h4>
//     </div>
//   );
// };

// export default Generation;
