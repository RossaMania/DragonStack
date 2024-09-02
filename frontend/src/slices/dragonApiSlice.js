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
  }),
});

export const { useFetchDragonQuery, useFetchAccountDragonsQuery } = dragonApiSlice;

// import { apiSlice } from "./apiSlice";


// export const dragonApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     fetchDragon: builder.query({
//       query: () => "/dragon/new",
//       method: "GET", // default
//     }),
//     createDragon: builder.mutation({
//       query: (newDragon) => ({
//         url: '/dragon',
//         method: 'POST',
//         body: newDragon,
//       }),
//     }),
//   }),
// });

// export const { useFetchDragonQuery, useCreateDragonMutation } = dragonApiSlice;