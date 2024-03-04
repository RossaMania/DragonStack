import React, { useState } from "react";

const Generation = () => {

  const [generation, setGeneration] = useState({ generationId: "696969", expiration: "2099-01-01" });

  componentDidMount =() => {
    this.fetchGeneration();
  };

  fetchGeneration = () => {
    fetch("http://localhost:3000/generation")
      .then(response => {
        console.log("response", response);
        response.json()
      })
      .then(json => {
        console.log("json", json);
        setGeneration(json.generation);
      })
      .catch(error => console.error("error", error));
  };

  return (
    <div>
      <h3>Generation {generation.generationId}. Expires on:</h3>
      <h4>{new Date(generation.expiration).toString()}</h4>
    </div>
  );
};

export default Generation;