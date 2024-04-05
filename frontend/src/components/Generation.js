import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchGenerationQuery } from "../slices/generationApiSlice";
import { setGeneration, setLoading, setError } from "../slices/generationSlice";

const Generation = () => {
  const dispatch = useDispatch();
  const { data: generation, error, isLoading } = useFetchGenerationQuery();
  const generationData = useSelector((state) => state.generation);

  useEffect(() => {
    dispatch(setLoading(true));
    if (generation) {
      dispatch(setGeneration(generation));
      dispatch(setLoading(false));
    } else if (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  }, [generation, error, dispatch]);

  if (isLoading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  return (
    <div>
      <h3>Generation {generationData.generationId}. Expires on:</h3>
      <h4>{new Date(generationData.expiration).toString()}</h4>
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
