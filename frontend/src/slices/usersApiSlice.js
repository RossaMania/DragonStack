import { ACCOUNT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${ACCOUNT_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include"  // Ensure cookies are sent with the request
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${ACCOUNT_URL}/signup`,
        method: "POST",
        body: data,
        credentials: "include"  // Ensure cookies are sent with the request
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${ACCOUNT_URL}/logout`,
        method: "POST",
        credentials: "include"  // Ensure cookies are sent with the request
      }),
    }),
    authenticated: builder.query({
      query: () => ({
        url: `${ACCOUNT_URL}/authenticated`,
        method: "GET",
        credentials: 'include'  // Ensure cookies are sent with the request
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useAuthenticatedQuery } = usersApiSlice;