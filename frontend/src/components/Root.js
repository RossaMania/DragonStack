import React from 'react';
import { useSelector } from 'react-redux';
import Home from './Home';
import AuthForm from './AuthForm';

const Root = () => {
  const login = useSelector(state => state.auth.login);

  return login ? <Home /> : <AuthForm />;
};

export default Root;


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Home from "./Home";
// import AuthForm from "./AuthForm";
// import { useAuthenticatedQuery } from "../slices/usersApiSlice";
// import { setLoginStatus } from "../slices/authSlice";
// import Loader from "./Loader";


// const Root = () => {
//   const dispatch = useDispatch();
//   const login = useSelector(state => state.auth.login);
//   const { data, error, isLoading } = useAuthenticatedQuery();

//   useEffect(() => {
//     if (data) {
//       dispatch(setLoginStatus(data.authenticated));
//     } else if (error) {
//       dispatch(setLoginStatus(false));
//     }
//   }, [data, error, dispatch]);

//   if (isLoading) return <Loader />;

//   return login ? <Home /> : <AuthForm />;
// }

// export default Root;