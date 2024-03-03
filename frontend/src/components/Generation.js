import React from "react";

const Generation = () => {

  const generation = { generationId: 696969, expiration: "2099-01-01" };

  return (
    <div>
      <h3>Generation {Generation.generationId}. Expires on:</h3>
      <h4>{new Date(generation.expiration).toString()}</h4>
    </div>
  );
};

export default Generation;