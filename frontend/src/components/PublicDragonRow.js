import { Button } from "react-bootstrap";
import DragonAvatar from "./DragonAvatar";

const PublicDragonRow = ({ dragon }) => {
  return (
    <div>
      <div>{dragon.nickname}</div>
      <div>{dragon.dragonId}</div>
      <DragonAvatar dragon={dragon} />
      <div>{dragon.saleValue}</div>
      <br />
      <Button>Buy!</Button>
    </div>
  )
}

export default PublicDragonRow