import { apiSlice } from "./apiSlice";


export const dragonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchGeneration: builder.query({
      query: () => "/dragon/new",
      method: "GET", // default
    }),
  }),
});

export const { useFetchDragonQuery } = DragonApiSlice;