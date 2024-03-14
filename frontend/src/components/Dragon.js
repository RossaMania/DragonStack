import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import DragonAvatar from "./DragonAvatar";

const DEFAULT_DRAGON = {
  dragonId: "",
  generationId: "",
  nickname: "",
  birthdate: "",
  traits: [],
};

const Dragon = () => {
  const [dragon, setDragon] = useState(DEFAULT_DRAGON);

  useEffect(() => {
    fetchDragon();
  }, []);

  const fetchDragon = () => {
    fetch("http://localhost:3000/dragon/new")
      .then((response) => response.json())
      .then((json) => setDragon(json.dragon))
      .catch((error) => console.error("error", error));
  };

  return (
    <div>
      <h3>This is a Dragon</h3>
      <DragonAvatar dragon={dragon} />
      <Button onClick={fetchDragon}>New Dragon!</Button>
    </div>
  );
};

export default Dragon;

// import React, { Component } from "react";
// import DragonAvatar from "./DragonAvatar";

// import { Button } from "react-bootstrap";

// const DEFAULT_DRAGON = {
//   dragonId: "",
//   generationId: "",
//   nickname: "",
//   birthdate: "",
//   traits: []

// };

// class Dragon extends Component {

//   state = { dragon: DEFAULT_DRAGON };

//   componentDidMount() {
//     this.fetchDragon();
//   }

//       fetchDragon = () => {
//         fetch("http://localhost:3000/dragon/new")
//         .then((response) => response.json())
//         .then((json) => this.setState({ dragon: json.dragon }))
//         .catch((error) => console.error("error", error));
//      };

//   render () {
//     const { dragon } = this.state;

//     return (
//       <div>
//         <h3>This is a Dragon</h3>
//         <DragonAvatar dragon={dragon} />
//         <Button onClick={this.fetchDragon}>New Dragon!</Button>
//       </div>
//     );
//   }
// }

// export default Dragon;
