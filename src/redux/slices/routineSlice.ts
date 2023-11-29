import { createAsyncThunk, createSlice, nanoid, PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { IExercise } from "./exerciseSlice";
import axios from "axios";
import { RootState } from "../store";

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

export const RoutineInitialState: IRoutine[] = [];

const BASE = "http://localhost:5001";

export const addRoutine = createAsyncThunk(
  "routines/addRoutine",
  async (data: IRoutine, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    if (state.persistedReducer.user.isLoggedIn) {
      const response = await axios.post(
      `${BASE}/api/routines`,
      {
        ...state.persistedReducer.currentRoutine,
      },
      { headers: { Authorization: `Bearer ${data._id}` } }
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
    const response = await axios.get(`${BASE}/api/routines/${credentials.username}`, {
      headers: { Authorization: `Bearer ${credentials.accessToken}` },
    });
    return response.data as IRoutine[];
  }
);

export const RoutineSlice = createSlice({
  name: "routines",
  initialState: RoutineInitialState,
  reducers: {
    
    // editRoutine: (state, action: PayloadAction<IRoutine>) => {
    //   state[action.payload._id] = { ...action.payload };
    // },
    // deleteRoutine: (state, action: PayloadAction<string>) => {
    //   delete state[action.payload];
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getRoutines.fulfilled, (state, action: PayloadAction<IRoutine[]>) => {
      state = action.payload
      console.log(action.payload);
      return [...action.payload];
    })
  },
});

// export const { editRoutine, deleteRoutine } = RoutineSlice.actions