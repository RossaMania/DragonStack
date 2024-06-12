import { apiSlice } from "./apiSlice";

export const dragonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchDragon: builder.query({
      query: () => "/dragon/new",
    }),
    fetchAccountDragons: builder.query({
      query: () => "/account/dragons",
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