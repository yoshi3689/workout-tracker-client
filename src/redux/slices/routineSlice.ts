import { createAsyncThunk, createSlice, nanoid, PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { IExercise } from "./exerciseSlice";
import axios from "axios";
import { RootState } from "../store";
import { request } from "../../axios/axios";
import { ISet } from "./setsSlice";
import { filterByBodyParts } from "../../utils/filterByBodyPart";

export interface IRoutine {
  _id: string,
  username: string,
  name: string,
  createdAt: string,
  isEditing: boolean,
  exercises: IExercise[],
  muscleGroups: string[],
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

const createReqBody = (
  newRoutine: IRoutine, 
  exercises: Record<string, IExercise>,
  sets: Record<string, Record<string, ISet>>
): IRoutine => {
  const muscleGroups = new Set<string>();
  return {
    ...newRoutine,
    isEditing: false,
    exercises: Object.values(exercises).map(e => {
      muscleGroups.add(e.muscleGroups[0]);
      return {...e, sets: Object.values(sets[e._id])}
    }),
    muscleGroups: filterByBodyParts(muscleGroups)
  }
}

export const addRoutine = createAsyncThunk(
  "routines/addRoutine",
  async (data: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { newRoutine, auth, exercises, sets } = state.persistedReducer;
    if (auth.isLoggedIn) {
      const reqBody: IRoutine = createReqBody(newRoutine, exercises, sets);
      reqBody.username = data;
      reqBody.createdAt = new Date().toISOString();
      const response = await request.post(`routines`, reqBody,
      { headers: { Authorization: `Bearer ${auth.accessToken}` } }
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
    const { newRoutine, auth, exercises, sets } = state.persistedReducer;
    if (auth.isLoggedIn) {
      const reqBody: IRoutine = createReqBody(newRoutine, exercises, sets);
      const response = await request.patch(`routines`, reqBody,
        { headers: { Authorization: `Bearer ${auth.accessToken}` } }
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
  async (credentials: ICredentials, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { auth } = state.persistedReducer;
    const response = await request.get(`routines/${credentials.username}`, {
      headers: { Authorization: `Bearer ${auth.accessToken}` }
    });
    return response.data as IRoutine[];
  }
);

export const RoutineSlice = createSlice({
  name: "routines",
  initialState: RoutineInitialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(getRoutines.fulfilled, (state, action: PayloadAction<IRoutine[]>) => {
      state = action.payload
      return [...action.payload];
    })
  },
});

// export const { editRoutine, deleteRoutine } = RoutineSlice.actions