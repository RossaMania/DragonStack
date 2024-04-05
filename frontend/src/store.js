import { apiSlice } from "./slices/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
import reducerWithLogs from "./slices/generationSlice";
import dragonReducer from './slices/dragonSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    generation: reducerWithLogs,
    dragon: dragonReducer,
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
