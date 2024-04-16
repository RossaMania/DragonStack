import { apiSlice } from "./apiSlice";

export const dragonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchDragon: builder.query({
      query: () => "/dragon/new",
    }),
  }),
});

export const { useFetchDragonQuery } = dragonApiSlice;

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