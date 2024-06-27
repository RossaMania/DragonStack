import React from 'react';
import { useFetchAccountDragonsQuery } from '../slices/dragonApiSlice';

const AccountDragons = () => {
  const { data, error, isLoading } = useFetchAccountDragonsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log('Fetched account dragons:', data);

  return (
    <div>
      <h1>Account Dragons</h1>
      <ul>
        {data && data.dragons ? (
          data.dragons.map((dragon) => (
            <li key={dragon.dragonId}>{dragon.nickname}</li>
          ))
        ) : (
          <p>No dragons available.</p>
        )}
      </ul>
    </div>
  );
};

export default AccountDragons;



// import React from "react";
// import Loader from "./Loader";
// import { useFetchAccountDragonsQuery } from "../slices/dragonApiSlice";

// const AccountDragons = () => {
//   const { data = { dragons: [] }, error, isLoading } = useFetchAccountDragonsQuery();

//   if (isLoading) return <Loader />;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <h1>Account Dragons</h1>
//       <ul>
//         {data.dragons.map((dragon) => (
//           <li key={dragon.id}>{dragon.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AccountDragons;