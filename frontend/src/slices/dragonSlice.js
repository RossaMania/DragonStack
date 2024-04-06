import { createSlice } from "@reduxjs/toolkit";

const dragonSlice = createSlice({
  name: "dragon",
  initialState: {
    selectedDragon: null,
    error: null,
  },
  reducers: {
    selectDragon: (state, action) => {
      state.selectedDragon = action.payload;
    },
    clearSelectedDragon: (state) => {
      state.selectedDragon = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  selectDragon,
  clearSelectedDragon,
  setError,
  clearError,
} = dragonSlice.actions;

export default dragonSlice.reducer;