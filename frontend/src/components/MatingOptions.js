import { Button } from "react-bootstrap";

const MatingOptions = ({ accountDragons }) => {
  console.log("MatingOptions accountDragons:", accountDragons);

  // Check if accountDragons is an array directly
  if (Array.isArray(accountDragons)) {
    return (
      <div>
        <h4>Pick one of your dragons to mate with!</h4>
        <div>
          {accountDragons.map(dragon => (
            <span key={dragon.dragonId}>
              <Button>
                G{dragon.generationId}.ID{dragon.dragonId}. {dragon.nickname}
              </Button>
            </span>
          ))}
        </div>
      </div>
    );
  }

  // Check if accountDragons has a dragons property that is an array
  if (accountDragons && Array.isArray(accountDragons.dragons)) {
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
    );
  }

  console.log("No dragons available for mating or incorrect structure:", accountDragons);
  return <div>No dragons available for mating.</div>;
};

export default MatingOptions;