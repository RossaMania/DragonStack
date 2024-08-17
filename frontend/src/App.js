import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuthenticatedQuery } from "./slices/usersApiSlice";
import { setLoginStatus } from "./slices/authSlice";
import { Outlet } from "react-router-dom";


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

  return (
    <div>
      <Outlet />
    </div>
  );

}

export default App

