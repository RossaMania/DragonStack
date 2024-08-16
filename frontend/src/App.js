import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuthenticatedQuery } from "./slices/usersApiSlice";
import { setLoginStatus } from "./slices/authSlice";
import Root from "./components/Root";

const App = () => {
  const dispatch = useDispatch();
  const { data, error } = useAuthenticatedQuery();

  useEffect(() => {
    if (data) {
      dispatch(setLoginStatus(data.authenticated));
    } else if (error) {
      dispatch(setLoginStatus(false));
    }
  }, [data, error, dispatch]);

  return <Root />;
};

export default App

