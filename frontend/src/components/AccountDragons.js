import React from "react";
import { useFetchAccountDragonsQuery } from "../slices/dragonApiSlice";
import AccountDragonRow from "./AccountDragonRow";
import { NavLink } from "react-router-dom";
import Loader from "./Loader";

const AccountDragons = () => {
  const { data, error, isLoading } = useFetchAccountDragonsQuery();

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Account Dragons</h1>
      <ul>
        {data && data.dragons ? (
          data.dragons.map((dragon) => {
            return (
              <div key={dragon.dragonId}>
                <AccountDragonRow dragon={dragon} />
              </div>
            );
          })
        ) : (
          <p>No dragons available.</p>
        )}
      </ul>
      <NavLink to="/">Home</NavLink>
    </div>
  );
};

export default AccountDragons;
