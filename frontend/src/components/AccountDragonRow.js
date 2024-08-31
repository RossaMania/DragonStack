import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DragonAvatar from "./DragonAvatar";

const AccountDragonRow = ({ dragon }) => {


  // A state variable to store the nickname of the dragon.
  const [nickname, setNickname] = useState(dragon.nickname);

  // A state variable to store the edit mode of the dragon.
  const [edit, setEdit] = useState(false);


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
    body: JSON.stringify({ dragonId: dragon.dragonId, nickname })
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


  return (
    <div>
      <input type="text" value={nickname} onChange={updateNickname} disabled={!edit} />
      <DragonAvatar dragon={dragon} />
      {edit ? <Button onClick={save}>Save</Button> : <Button onClick={toggleEdit}>Edit</Button>}
    </div>
  );

}

export default AccountDragonRow;