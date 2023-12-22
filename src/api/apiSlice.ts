import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = process.env.NODE_ENV === "production" ? process.env.REACT_APP_REQUEST_URL_PROD : process.env.REACT_APP_REQUEST_URL;

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ['Routines', 'Auth', 'User'],
    endpoints: builder => ({})
})