import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DragonAvatar from "./DragonAvatar";

const AccountDragonRow = ({ dragon }) => {

  // A state variable to store the nickname of the dragon.
  const [nickname, setNickname] = useState(dragon.nickname);

  // A state variable to store the edit mode of the dragon.
  const [edit, setEdit] = useState(false);

  // A state variable to store the sale value of the dragon.
  const [saleValue, setSaleValue] = useState(dragon.saleValue);

  // A state variable to store the isPublic value of the dragon.
  const [isPublic, setIsPublic] = useState(dragon.isPublic);

  // A state variable to store the sire value of the dragon.
  const [sireValue, setSireValue] = useState(dragon.sireValue);

  // A function that will toggle the edit mode of the dragon.
  const toggleEdit = (e) => {
    e.preventDefault();
    setEdit(!edit);
    console.log("Toggle edit mode:", edit);
  }

  // A function that will save the nickname of the dragon.
  const save = () => {
  console.log("Attempting to save nickname:", nickname);
  fetch("http://localhost:3000/dragon/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ dragonId: dragon.dragonId, nickname, saleValue, isPublic })
  })
    .then((response) => response.json())
    .then((json) => {
      console.log("Server response:", json);
      if (json.type === "error") {
        alert(json.message);
        console.error("Error from server:", json.message);
      } else {
        console.log("Dragon updated successfully:", json);
        setEdit(false);
      }
    })
    .catch((error) => {
      alert("An error occurred:", error.message);
      console.error("Error updating dragon:", error);
    });
};

  // A function that will update the nickname of the dragon.
  const updateNickname = (e) => {
    e.preventDefault();
    setNickname(e.target.value);
    console.log("Update nickname:", nickname);
  }

  const updateSaleValue = (e) => {
    e.preventDefault();
    setSaleValue(e.target.value);
    console.log("Update sale value:", saleValue);
  }

  const updateIsPublic = (e) => {
    e.preventDefault();
    setIsPublic(e.target.checked);
    console.log("Update is public:", isPublic);
  }

  const updateSireValue = (e) => {
    e.preventDefault();
    setSireValue(e.target.value);
    console.log("Update sire value:", sireValue);
  }

  return (
    <div>
      <input type="text" value={nickname} onChange={updateNickname} disabled={!edit} />
      <DragonAvatar dragon={dragon} />
      <div>
      <span>
        Sale Value:{" "}
        <input
          type="number"
          disabled={!edit}
          value={saleValue}
          onChange={updateSaleValue}
        />
      </span>{" "}
      <span>
        Sire Value:{" "}
        <input
          type="number"
          disabled={!edit}
          value={sireValue}
          onChange={updateSireValue}
        />
      </span>{" "}
      <span>
        Public:{" "}
        <input
          type="checkbox"
          disabled={!edit}
          checked={isPublic}
          onChange={updateIsPublic}
        />
      </span>
      {edit ? <Button onClick={save}>Save</Button> : <Button onClick={toggleEdit}>Edit</Button>}
      </div>
    </div>
  );

}

export default AccountDragonRow;