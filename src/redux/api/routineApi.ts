import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IRoutine } from '../slices/routineSlice'

// Define a service using a base URL and expected endpoints
export const routineApi = createApi({
  reducerPath: 'routineApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001/api' }),
  endpoints: (builder) => ({
    getRoutines: builder.query<IRoutine[], string>({
      query: (username) => `routines/${username}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetRoutinesQuery } = routineApi