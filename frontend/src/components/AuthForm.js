import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";

const AuthForm = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const updateUsername = (e) => {
    setUsername(e.target.value);
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  }

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ username, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      console.log("Logged in!");
    } catch (error) {
      console.error("Oops! Log in failed!", error);
    }
  }

  const signupHandler = () => {
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
        <Button onClick={loginHandler}>Log In!</Button>
        <span> or </span>
        <Button onClick={signupHandler}>Sign Up!</Button>
      </div>

    </div>
  );
}

export default AuthForm;