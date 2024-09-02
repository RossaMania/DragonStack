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