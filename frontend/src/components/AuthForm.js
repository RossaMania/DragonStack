import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";

const AuthForm = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const updateUsername = (event) => {
    setUsername(event.target.value);
  }

  const updatePassword = (event) => {
    setPassword(event.target.value);
  }

  const login = () => {
    console.log("login", { username, password });
  }

  const signup = () => {
    console.log("signup", { username, password });
  }

  return (
    <div>
      <h2>Dragon Stack</h2>
      <FormGroup>
        <FormLabel>Username</FormLabel>
        <FormControl
          type="text"
          value={username}
          placeholder="username"
          onChange={updateUsername}
        />
        <FormLabel>Password</FormLabel>
        <FormControl
          type="password"
          value={password}
          placeholder="password"
          onChange={updatePassword}
        />
      </FormGroup>
      <div>
        <Button onClick={login}>Log In!</Button>
        <span> or </span>
        <Button onClick={signup}>Sign Up!</Button>
      </div>

    </div>
  );
}

export default AuthForm;