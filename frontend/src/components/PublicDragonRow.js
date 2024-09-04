import DragonAvatar from "./DragonAvatar";

const PublicDragonRow = ({ dragon }) => {
  return (
    <div>
      <div>{dragon.nickname}</div>
      <DragonAvatar dragon={dragon} />
      <div>{dragon.saleValue}</div>
    </div>
  )
}

export default PublicDragonRow