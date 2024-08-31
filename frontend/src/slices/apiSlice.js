import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // crendentials: "include" will face CORS if credential is not provided
    credentials: "include"
  }),
  tagTypes: ["Dragon", "Generation", "User"],
  endpoints: () => ({}),
});