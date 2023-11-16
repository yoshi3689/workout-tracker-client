import { configureStore } from '@reduxjs/toolkit'

import { RoutineSlice } from './slices/routineSlice'
import { ExerciseSlice } from './slices/exerciseSlice'
import { SetSlice } from './slices/setsSlice'
import { userSlice } from './slices/userSlice'
import { combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  routines: RoutineSlice.reducer,
  exercises: ExerciseSlice.reducer,
  sets: SetSlice.reducer,
  user: userSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: {
    persistedReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const persister = persistStore(store);