import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MatingOptions = ({ accountDragons, patronDragonId }) => {
  const navigate = useNavigate();
  console.log("MatingOptions accountDragons:", accountDragons);

  const mateDragons = ({ matronDragonId, patronDragonId }) => () =>{
    fetch("http://localhost:3000/dragon/mate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ matronDragonId, patronDragonId }),
    })
      .then((response) => response.json())
      .then((json) => {
        alert(json.message);
        if (json.type !== "error") {
        navigate("/account-dragons");
        }
      })
      .catch((error) => alert(error.message));
  };

  if (!accountDragons || !Array.isArray(accountDragons.dragons)) {
    return <div>No dragons available for mating.</div>;
  }

    return (
      <div>
        <h4>Pick one of your dragons to mate with!</h4>
        <div>
          {accountDragons.dragons.map(dragon => (
            <span key={dragon.dragonId}>
              <Button onClick={mateDragons({patronDragonId: patronDragonId, matronDragonId: dragon.dragonId})}>
                G{dragon.generationId}.ID{dragon.dragonId}. {dragon.nickname}
              </Button>
            </span>
          ))}
        </div>
      </div>
    );
};

export default MatingOptions;