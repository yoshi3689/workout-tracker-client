import { configureStore } from '@reduxjs/toolkit'

import { RoutineSlice } from './slices/routineSlice'
import { ExerciseSlice } from './slices/exerciseSlice'
import { SetSlice } from './slices/setsSlice'
import { userSlice } from './slices/userSlice'


const store = configureStore({
  reducer: {
    routines: RoutineSlice.reducer,
    exercises: ExerciseSlice.reducer,
    sets: SetSlice.reducer,
    user: userSlice.reducer
  },
  devTools: { trace: true, traceLimit: 25 },
      
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;