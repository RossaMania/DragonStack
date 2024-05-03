import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";

const AuthForm = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h2>Dragon Stack</h2>
      <FormGroup>
        <FormLabel>Username</FormLabel>
        <FormControl
          type="text"
          value={username}
          placeholder="username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <FormLabel>Password</FormLabel>
        <FormControl
          type="password"
          value={password}
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </FormGroup>
      <div>
        <Button>Log In!</Button>
        <span> or </span>
        <Button>Sign Up!</Button>
      </div>

    </div>
  );
}

export default AuthForm;