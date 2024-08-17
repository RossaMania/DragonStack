import React from "react";
import { useFetchAccountDragonsQuery } from "../slices/dragonApiSlice";
import AccountDragonRow from "./AccountDragonRow";
import { NavLink } from "react-router-dom";

const AccountDragons = () => {
  const { data, error, isLoading } = useFetchAccountDragonsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log("Fetched account dragons:", data);
  console.log("Dragons array:", data.dragons);

  return (
    <div>
      <h1>Account Dragons</h1>
      <ul>
        {data && data.dragons ? (
          data.dragons.map((dragon) => {
            console.log("Rendering dragon:", dragon);
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
