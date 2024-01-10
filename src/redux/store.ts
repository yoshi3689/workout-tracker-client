import { configureStore } from '@reduxjs/toolkit'

import { routineSlice } from './slices/routineSlice'
import { newRoutineSlice } from './slices/newRoutineSlice'
import { exerciseSlice } from './slices/exerciseSlice'
import { setSlice } from './slices/setsSlice'
import { userSlice } from './slices/userSlice'
import { combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

import storage from 'redux-persist/lib/storage'
import { authSlice } from './slices/authSlice'
import { personalRecordSlice } from './slices/personalRecordSlice'
import { liftableWeightSlice } from './slices/liftableWeightSlice'
import { routineTemplateSlice } from './slices/routineTemplateSlice'
import { routineStateSlice } from './slices/routineStateSlice'

const persistConfig = {
  key: "root",
  storage,
  blackList: ["user", "routines"]
  // blackList: ["user", "routines", "personalRecords", "liftableWeights"]
};

const reducers = combineReducers({
  user: userSlice.reducer,
  routines: routineSlice.reducer,
  exercises: exerciseSlice.reducer,
  sets: setSlice.reducer,
  newRoutine: newRoutineSlice.reducer,
  personalRecords: personalRecordSlice.reducer,
  liftableWeights: liftableWeightSlice.reducer,
  routineState: routineStateSlice.reducer,
  auth: authSlice.reducer,
  routineTemplate: routineTemplateSlice.reducer
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
persister.purge();