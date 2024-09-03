import { apiSlice } from "./apiSlice";

export const dragonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchDragon: builder.query({
      query: () => ({
      url: "/dragon/new",
      method: "GET",
      }),
    }),
    fetchAccountDragons: builder.query({
      query: () => ({
      url: "/account/dragons",
      method: "GET",
      }),
    }),
    fetchPublicDragons: builder.query({
      query: () => ({
      url: "/dragon/public-dragons",
      method: "GET",
      }),
    }),
  }),
});

export const { useFetchDragonQuery, useFetchAccountDragonsQuery, useFetchPublicDragonsQuery } = dragonApiSlice;