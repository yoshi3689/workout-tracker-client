import { configureStore } from '@reduxjs/toolkit'

import { RoutineSlice } from './slices/routineSlice'
import { newRoutineSlice } from './slices/newRoutineSlice'
import { ExerciseSlice } from './slices/exerciseSlice'
import { SetSlice } from './slices/setsSlice'
import { userSlice } from './slices/userSlice'
import { combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: "root",
  storage,
  blackList: ["user", "routines"]
};

const reducers = combineReducers({
  user: userSlice.reducer,
  routines: RoutineSlice.reducer,
  exercises: ExerciseSlice.reducer,
  sets: SetSlice.reducer,
  newRoutine: newRoutineSlice.reducer
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: {
    persistedReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const persister = persistStore(store);

// The below is to manually reset the persisted states
// persister.purge();