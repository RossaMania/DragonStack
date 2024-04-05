import { apiSlice } from "./slices/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
import generationReducer from "./slices/generationSlice";

const store = configureStore({
  reducer: {
    generation: generationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

// import { configureStore } from "@reduxjs/toolkit";


// const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware)
// });

// export default store;
