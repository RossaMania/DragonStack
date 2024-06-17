import { createSlice } from "@reduxjs/toolkit";
import { dragonApiSlice } from "./dragonApiSlice";

const accountDragonsSlice = createSlice({
  name: "accountDragons",
  initialState: { dragons: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        dragonApiSlice.endpoints.fetchAccountDragons.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        dragonApiSlice.endpoints.fetchAccountDragons.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.dragons = action.payload.dragons;
        }
      )
      .addMatcher(
        dragonApiSlice.endpoints.fetchAccountDragons.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});



export default accountDragonsSlice.reducer;