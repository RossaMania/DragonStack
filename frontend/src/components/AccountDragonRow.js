import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DragonAvatar from "./DragonAvatar";

const AccountDragonRow = ({ dragon }) => {


  // A state variable to store the nickname of the dragon.
  [nickname, setNickname] = useState(dragon.nickname);

  // A state variable to store the edit mode of the dragon.
  [edit, setEdit] = useState(false);


  // A function that will toggle the edit mode of the dragon.
  const toggleEdit = () => {
    e.preventDefault();
    setEdit(!edit);
    console.log("Toggle edit mode:", edit);
  }

  // A function that will save the nickname of the dragon.
  const save = () => {
    setEdit(false);
    console.log("Save nickname:", nickname);
  }

  // A function that will update the nickname of the dragon.
  const updateNickname = (event) => {
    e.preventDefault();
    setNickname(event.target.value);
    console.log("Update nickname:", nickname);
  }

  // If the edit mode is true, we need to display an input field with the nickname of the dragon.
  // If the edit mode is true, we need to display a "Save" button.


  // If the edit mode is false, we need to display the nickname of the dragon.
  // If the edit mode is false, we need to display an "Edit" button.

  if (edit) {
    return (
      <div>
        <input
          type="text"
          value={nickname}
          onChange={updateNickname}
          disabled={!edit}
        />
        <Button onClick={save}>Save</Button>
      </div>
    );
  }

  return (
    <div>
      <div>{dragon.nickname}</div>
      <Button onClick={toggleEdit}>Edit</Button>
      <DragonAvatar dragon={dragon} />
    </div>
  );

}

export default AccountDragonRow;