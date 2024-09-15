import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import DragonAvatar from "./DragonAvatar";
import { useFetchDragonQuery } from "../slices/dragonApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectDragon } from "../slices/dragonSlice";
import Loader from "./Loader";

const Dragon = () => {
  const dispatch = useDispatch();
  const { data: dragon, error, isLoading, refetch } = useFetchDragonQuery();
  const selectedDragon = useSelector((state) => state.dragon.selectedDragon);

  // Dispatch the dragon data to the Redux store if dragon data is available
  useEffect(() => {
    if (dragon) {
      dispatch(selectDragon(dragon));
    }
  }, [dragon, dispatch]);

  const handleCreateDragon = () => {
    refetch();
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <h3>This is a Dragon</h3>
      {/* Loader while fetching */}
      {isLoading && <Loader />}

      {/* Either show error or DragonAvatar, but not both */}
      {!isLoading && error ? (
        <h2>Error: {error.data?.message || "An error occurred"}</h2>
      ) : (
        selectedDragon && <DragonAvatar dragon={selectedDragon.dragon} />
      )}
      <Button onClick={handleCreateDragon}>New Dragon!</Button>
    </div>
  );
};

export default Dragon;
