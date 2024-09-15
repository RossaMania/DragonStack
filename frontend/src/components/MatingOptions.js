import { Button } from "react-bootstrap"

const MatingOptions = ({ accountDragons }) => {
  console.log("MatingOptions accountDragons:", accountDragons);

  if (!accountDragons || !accountDragons.dragons) {
    return <div>No dragons available for mating.</div>;
  }

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