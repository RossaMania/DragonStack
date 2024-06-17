import { apiSlice } from "./slices/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
import generationReducer from "./slices/generationSlice";
import dragonReducer from "./slices/dragonSlice";
import authSliceReducer from "./slices/authSlice";
import accountDragonsReducer from "./slices/accountDragonsSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    generation: generationReducer,
    dragon: dragonReducer,
    auth: authSliceReducer,
    accountDragons: accountDragonsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;