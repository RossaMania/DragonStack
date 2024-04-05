import { apiSlice } from "./apiSlice";


export const generationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchGeneration: builder.query({
      query: () => "/generation",
      method: "GET", // default
    }),
  }),
});

export const { useFetchGenerationQuery } = generationApiSlice;






// export const { setGeneration } = generationSlice.actions;
// export default generationSlice.reducer;

// import { GENERATION_ACTION_TYPE } from "../actions/types";

// const DEFAULT_GENERATION = { generationId: "", expiration: "" };

// export const generationReducer = (state, action) => {
//   // console.log("generationReducer state", state);
//   // console.log("generationReducer action", action);

//   if (action.type === GENERATION_ACTION_TYPE) {
//     return { generation: action.generation };
//   }

//   return { generation: DEFAULT_GENERATION };
// };
