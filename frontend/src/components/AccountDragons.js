import React from 'react';
import { useFetchAccountDragonsQuery } from '../slices/dragonApiSlice';
import AccountDragonRow from './AccountDragonRow';

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
            <li key={dragon.dragonId}>
              <AccountDragonRow dragon={dragon} />
            </li>
          ))
        ) : (
          <p>No dragons available.</p>
        )}
      </ul>
    </div>
  );
};

export default AccountDragons;