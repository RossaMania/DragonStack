import { Button } from "react-bootstrap";
import DragonAvatar from "./DragonAvatar";
import { useNavigate } from "react-router-dom";

const PublicDragonRow = ({ dragon }) => {
  const navigate = useNavigate();

  const buyDragon = () => {
    fetch("http://localhost:3000/dragon/buy", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dragonId: dragon.dragonId, saleValue: dragon.saleValue })
    })
      .then(response => response.json())
      .then(json => {
        alert(json.message);
        if (json.type !== "error") {
          // redirect to account-dragons page
          navigate("/account-dragons");
        }
      })
      .catch(error => alert(error.message));
  };

  return (
    <div>
      <div>{dragon.nickname}</div>
      <div>{dragon.dragonId}</div>
      <DragonAvatar dragon={dragon} />
      <div>{dragon.saleValue}</div>
      <br />
      <Button onClick={buyDragon}>Buy!</Button>
    </div>
  )
}

export default PublicDragonRow