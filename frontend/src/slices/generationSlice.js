import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  generation: null,
  isLoading: false,
  error: null,
};

const generationSlice = createSlice({
  name: "generation",
  initialState,
  reducers: {
    setGeneration: (state, action) => {
      state.generation = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setGeneration, setLoading, setError } = generationSlice.actions;

const generationReducer = (state, action) => {
    console.log('Action received:', action);
    const newState = generationSlice.reducer(state, action);
    console.log('New state:', newState);
    return newState;
};

export default generationReducer;