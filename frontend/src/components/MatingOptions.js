import { Button } from "react-bootstrap"

const MatingOptions = ({ accountDragons }) => {
  return (
    <div>
      <h4>Pick one of your dragons to mate with!</h4>
      <div>
        {accountDragons.dragons.map(dragon => (
          <span key={dragon.dragonId}>
            <Button>
              G{dragon.generationId}.ID{dragon.dragonId}. {dragon.nickname}
            </Button>
          </span>
        ))}
      </div>
    </div>
  )
}

export default MatingOptions