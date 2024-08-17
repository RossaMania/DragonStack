import React, { useState } from "react";
import DragonAvatar from "./DragonAvatar";

const AccountDragonRow = ({ dragon }) => {

  // We need to get the nickname of the dragon from the dragon object.
  // We need to allow the user to add and update the nickname of the dragon.
  // We need to display the nickname of the dragon.
  // There should be a button that says "Edit" and a button that says "Save".

  // We need to create a state variable to store the nickname of the dragon.
  // We need to create a state variable to store the edit mode of the dragon.

  [nickname, setNickname] = useState(dragon.nickname);
  [edit, setEdit] = useState(false);

  // We need to create a function that will toggle the edit mode of the dragon.
  // We need to create a function that will save the nickname of the dragon.
  // We need to create a function that will update the nickname of the dragon.

  const toggleEdit = () => {
    e.preventDefault();
    setEdit(!edit);
    console.log("Toggle edit mode:", edit);
  }

  const save = () => {
    setEdit(false);
    console.log("Save nickname:", nickname);
  }

  const update = (event) => {
    setNickname(event.target.value);
    console.log("Update nickname:", nickname);
  }

  // If the edit mode is true, we need to display an input field with the nickname of the dragon.
  // If the edit mode is false, we need to display the nickname of the dragon.
  // If the edit mode is true, we need to display a "Save" button.
  // If the edit mode is false, we need to display an "Edit" button.

  if (edit) {
    return (
      <div>
        <input
          type="text"
          value={nickname}
          onChange={update}
        />
        <button onClick={save}>Save</button>
      </div>
    );
  }

  return (
    <div>
      <div>{dragon.nickname}</div>
      <button onClick={toggleEdit}>Edit</button>
      <DragonAvatar dragon={dragon} />
    </div>
  );

}

export default AccountDragonRow;