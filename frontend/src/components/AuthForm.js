import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation, useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials, setLoginStatus } from "../slices/authSlice";
import Loader from "./Loader";

const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();

  const [login, { error: loginError, isLoading: loginLoading }] = useLoginMutation();
  const [register, { error: registerError, isLoading: registerLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = isLogin
        ? await login({ username, password }).unwrap()
        : await register({ username, password }).unwrap();
      dispatch(setCredentials(res));
      dispatch(setLoginStatus(true));
    } catch (err) {
      dispatch(setLoginStatus(false));
      console.error(`Oops! ${isLogin ? "Log in" : "Sign up"} failed!`, err);
    }
  };

  return (
    <div>
      <h2>Dragon Stack</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Username</FormLabel>
          <FormControl
            type="text"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError && <p className="error">{loginError.message}</p>}
          {registerError && <p className="error">{registerError.message}</p>}
          {(loginLoading || registerLoading) && <Loader />}
        </FormGroup>
        <div>
          <Button type="submit">{isLogin ? "Log In!" : "Sign Up!"}</Button>
          <span> or </span>
          <Button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Log In"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;








// import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   useLoginMutation,
//   useRegisterMutation,
// } from "../slices/usersApiSlice.js";
// import { setCredentials, setLoginStatus } from "../slices/authSlice.js";
// import Loader from "./Loader.js";

// const AuthForm = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch();

//   const [login, { error, isLoading }] = useLoginMutation();

//   const [register, { error: registerError, isLoading: registerIsLoading }] =
//     useRegisterMutation();

//   const updateUsername = (e) => {
//     setUsername(e.target.value);
//   };

//   const updatePassword = (e) => {
//     setPassword(e.target.value);
//   };

//   const loginHandler = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await login({ username, password }).unwrap();
//     dispatch(setCredentials({res}));
//     dispatch(setLoginStatus(true));
//     console.log("Logged in!");
//   } catch (error) {
//     dispatch(setLoginStatus(false));
//     console.error("Oops! Log in failed!", error);
//   }
// };

//   const signupHandler = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await register({ username, password }).unwrap();
//     dispatch(setCredentials({ ...res }));
//     dispatch(setLoginStatus(true));
//   } catch (error) {
//     dispatch(setLoginStatus(false));
//     console.error("Oops! Sign up failed!", error);
//   }
// };

//   return (
//     <div>
//       <h2>Dragon Stack</h2>
//       <FormGroup>
//         <FormLabel>Username</FormLabel>
//         <FormControl
//           type="text"
//           value={username}
//           placeholder="username"
//           onChange={updateUsername}
//         />
//         <FormLabel>Password</FormLabel>
//         <FormControl
//           type="password"
//           value={password}
//           placeholder="password"
//           onChange={updatePassword}
//         />
//         {error && <p className="error">{error.message}</p>}
//         {registerError && <p className="error">{registerError.message}</p>}
//         {(isLoading || registerIsLoading) && <Loader />}
//       </FormGroup>
//       <div>
//         <Button onClick={loginHandler}>Log In!</Button>
//         <span> or </span>
//         <Button onClick={signupHandler}>Sign Up!</Button>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;
