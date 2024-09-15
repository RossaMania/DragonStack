import { useState } from "react";
import { Button } from "react-bootstrap";
import DragonAvatar from "./DragonAvatar";
import { useNavigate } from "react-router-dom";
import MatingOptions from "./MatingOptions";

const PublicDragonRow = ({ dragon, accountDragons }) => {
  const navigate = useNavigate();

  const [displayMatingOptions, setDisplayMatingOptions] = useState(false);

  const toggleDisplayMatingOptions = () => {
    setDisplayMatingOptions(!displayMatingOptions);
  };

  const buyDragon = () => {
    fetch("http://localhost:3000/dragon/buy", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dragonId: dragon.dragonId,
        saleValue: dragon.saleValue,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        alert(json.message);
        if (json.type !== "error") {
          // redirect to account-dragons page
          navigate("/account-dragons");
        }
      })
      .catch((error) => alert(error.message));
  };

  console.log("Account Dragons Data:", accountDragons);

  return (
    <div>
      <div>{dragon.nickname}</div>
      <div>
        <span>ID: {dragon.dragonId}</span>
      </div>
      <DragonAvatar dragon={dragon} />
      <div>
        <span>Sale Value: {dragon.saleValue}</span>
        {" | "}
        <span>Sire Value: {dragon.sireValue}</span>
      </div>
      <br />
      <Button onClick={buyDragon}>Buy!</Button>{" "}
      <Button onClick={toggleDisplayMatingOptions}>
        {displayMatingOptions ? "Cancel" : "Sire!"}
      </Button>
      {displayMatingOptions && (
        <div>
          <MatingOptions accountDragons={accountDragons} />
          <div></div>
        </div>
      )}
    </div>
  );
};

export default PublicDragonRow;
