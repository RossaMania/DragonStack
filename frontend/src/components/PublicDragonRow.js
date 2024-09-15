import { useState } from "react";
import { Button } from "react-bootstrap";
import DragonAvatar from "./DragonAvatar";
import { useNavigate } from "react-router-dom";
import MatingOptions from "./MatingOptions";
import { useFetchAccountDragonsQuery } from "./dragonApiSlice";
import Loader from "./Loader";

const PublicDragonRow = ({ dragon }) => {
  const navigate = useNavigate();

  const {
    data: accountDragons,
    error,
    isLoading,
  } = useFetchAccountDragonsQuery();

  const [displayMatingOptions, setDisplayMatingOptions] = useState(false);

  useEffect(() => {
    console.log("Fetched accountDragons:", accountDragons); // Debugging line
  }, [accountDragons]);

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

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading dragons.</div>;

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
