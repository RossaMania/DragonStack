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

  useEffect(() => {
    if (dragon) {
      dispatch(selectDragon(dragon));
    }
  }, [dragon, dispatch]);

  const handleCreateDragon = () => {
    refetch();
  };

  console.log("Dragon in parent component:", dragon);

  if (isLoading) return <Loader />;
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
