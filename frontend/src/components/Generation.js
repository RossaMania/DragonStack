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

    dispatch(setLoading(true));

    console.log("Dispatched setLoading with true");

    if (generation) {

      dispatch(setGeneration(generation));
      dispatch(setLoading(false));

    } else if (error) {

      console.log("generation is falsy");
      dispatch(setError(error.message));
      dispatch(setLoading(false));

    }
  }, [generation, error, dispatch]);

  if (isLoading) {
    console.log("Loading state:", isLoading);
    return <Loader />;
  }


  if (error) {
    console.log("Error state:", error);
    return `Error: ${error.message}`;
  }

  return (
    <div>
      <h3>Generation {generation.generation.generationId}. Expires on:</h3>
      <h4>{new Date(generation.generation.expiration).toString()}</h4>
    </div>
  );
};

export default Generation;



