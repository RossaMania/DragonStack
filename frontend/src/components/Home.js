import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Generation from "./Generation.js";
import Dragon from "./Dragon.js";

import { useLogoutMutation } from "../slices/usersApiSlice.js";
import { logout } from "../slices/authSlice.js";
import { Button } from "react-bootstrap";



const Home = () => {

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

const logoutHandler = async () => {

  console.log("Logout button clicked");

  try {
    await logoutApiCall().unwrap();
    dispatch(logout());
    console.log("Logged out!");
  } catch (error) {
    console.log(error);
  }

}


  return (
    <div>
      <Button onClick={logoutHandler}>Logout</Button>
      <h2>Dragon Stack</h2>
      <Generation />
      <Dragon />
    </div>
  );
};

fetch("http://localhost:3000/account/dragons", {
  credentials: "include",
})
  .then((response) => response.json())
  .then((json) => console.log("Account Dragons", json))
  .catch((error) => console.error("Error fetching account dragons", error));

export default Home;
