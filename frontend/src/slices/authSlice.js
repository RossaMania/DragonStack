import { createSlice } from "@reduxjs/toolkit";

// Initial state of the auth slice.
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    && JSON.parse(localStorage.getItem("userInfo")),
  login: false,
};

// Create the auth slice with the setCredentials reducer function to set the user's credentials in the state.
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // Set the user's credentials in the state with the data from the payload and save it to local storage.
      state.userInfo = action.payload;
      state.login = true;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      //Set the userInfo part of the state to null, and remove from localStorage.
      // We don't need to pass in the action because we are not using the payload.
      state.userInfo = null;
      state.login = false;
      localStorage.clear();
    },
    setLoginStatus: (state, action) => {
      // Set the login status in the state with the data from the payload.
      state.login = action.payload;
    },
  },
});

//Export the setCredentials reducer function from the auth slice as an action.
export const { setCredentials, logout, setLoginStatus } = authSlice.actions;

// Export the auth slice as the default reducer function.
export default authSlice.reducer;
