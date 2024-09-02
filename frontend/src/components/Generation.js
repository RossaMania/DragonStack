import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchGenerationQuery } from "../slices/generationApiSlice";
import { setGeneration, setLoading, setError } from "../slices/generationSlice";
import Loader from "./Loader";

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
    return <Loader />;
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



