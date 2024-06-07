import React from 'react';
import { useSelector } from 'react-redux';
import Home from './Home';
import AuthForm from './AuthForm';

const Root = () => {
  const login = useSelector(state => state.auth.login);

  return login ? <Home /> : <AuthForm />;
};

export default Root;
