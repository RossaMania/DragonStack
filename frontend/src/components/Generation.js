import React, { useEffect, useState } from "react";

const Generation = () => {
  const [generation, setGeneration] = useState({
    generationId: "",
    expiration: "",
  });

  const MINIMUM_DELAY = 3000;

  useEffect(() => {

    let timer;
    fetchNextGeneration();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const fetchGeneration = () => {
    fetch("http://localhost:3000/generation")
      .then(response => response.json())
      .then(json => {
        console.log("json", json);
        setGeneration(json.generation);
      })
      .catch((error) => console.error("error", error));
  };

  const fetchNextGeneration = () => {
    fetchGeneration();

    let delay = new Date(generation.expiration).getTime() - new Date().getTime();

    if (delay < MINIMUM_DELAY) {
      delay = MINIMUM_DELAY;
    }

    timer = setTimeout(() => {
      fetchNextGeneration();
    }, delay);

  }

  return (
    <div>
      <h3>Generation {generation.generationId}. Expires on:</h3>
      <h4>{new Date(generation.expiration).toString()}</h4>
    </div>
  );
};

export default Generation;
