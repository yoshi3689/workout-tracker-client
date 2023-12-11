import { createAsyncThunk, createSlice, nanoid, PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { IExercise } from "./exerciseSlice";
import axios from "axios";
import { RootState } from "../store";
import { request } from "../../axios/axios";

export interface IRoutine {
  _id: string,
  username: string,
  name: string,
  createdAt: string,
  isEditing: boolean,
  exercises: IExercise[],
}

export interface ICredentials {
  accessToken: string | undefined,
  username: string
}

export interface ICredentials {
  accessToken: string | undefined,
  username: string
}

export const RoutineInitialState: IRoutine[] = [];

export const addRoutine = createAsyncThunk(
  "routines/addRoutine",
  async (data: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { newRoutine, user, exercises, sets } = state.persistedReducer;
    if (user.isLoggedIn) {
      const reqBody: IRoutine = {
        ...newRoutine,
        username: data,
        createdAt: new Date().toISOString(),
        isEditing: false,
        exercises: Object.values(exercises).map(e => {
          return {...e, sets: Object.values(sets[e._id])}
        })
      }
      
      const response = await request.post(
      `api/routines`,
      reqBody,
      { headers: { Authorization: `Bearer ${user.accessToken}` } }
    );
    return response.data.response;
    } else {
      return {};
    }
  }
);

export const modifyRoutine = createAsyncThunk(
  "routines/modifyRoutine",
  async (data: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { newRoutine, user, exercises, sets } = state.persistedReducer;
    if (user.isLoggedIn) {
      const reqBody: IRoutine = {
        ...newRoutine,
        username: data,
        createdAt: new Date().toISOString(),
        isEditing: false,
        exercises: Object.values(exercises).map(e => {
          return {...e, sets: Object.values(sets[e._id])}
        })
      }
      
      const response = await request.patch(
      `api/routines`,
      reqBody,
        { headers: {
            Authorization: `Bearer ${user.accessToken}`
          }
        }
    );
    return response.data.response;
    } else {
      return {};
    }
  }
);

export const getRoutines = createAsyncThunk<
  IRoutine[],
  ICredentials
>(
  "routines/getRoutines",
  async (credentials: ICredentials) => {
    const response = await request.get(`api/routines/${credentials.username}`, {
      headers: { Authorization: `Bearer ${credentials.accessToken}` }
    });
    return response.data as IRoutine[];
  }
);

export const RoutineSlice = createSlice({
  name: "routines",
  initialState: RoutineInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoutines.fulfilled, (state, action: PayloadAction<IRoutine[]>) => {
      state = action.payload
      return [...action.payload];
    })
  },
});

// export const { editRoutine, deleteRoutine } = RoutineSlice.actions