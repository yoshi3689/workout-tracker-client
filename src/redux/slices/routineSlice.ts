import { createAsyncThunk, createSlice, nanoid, PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { IExercise } from "./exerciseSlice";
import axios from "axios";
import { RootState } from "../store";
import { request } from "../../axios/axios";
import { ISet } from "./setsSlice";
import { filterByBodyParts } from "../../utils/filterByBodyPart";
import { selectAccessToken } from "./authSlice";
import { useAppSelector } from "../hooks";

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



export const routineInitialState: IRoutine[] = [];



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
      let ss = Object.values(sets[e._id])
      return {...e, sets: ss, maxWeight: Math.max(...ss.map(s=>s.weight))}
    }),
    muscleGroups: filterByBodyParts(muscleGroups),
  }
}

export const addRoutine = createAsyncThunk(
  "routines/addRoutine",
  async (data: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { newRoutine, auth, exercises, sets } = state.persistedReducer;
    console.log(auth.isLoggedIn)
    if (auth.isLoggedIn) {
      const reqBody: IRoutine = createReqBody(newRoutine, exercises, sets);
      console.log(reqBody);
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

export const getPRs = createAsyncThunk<
  IRoutine[],
  ICredentials
>(
  "routines/getPRs",
  async ({username, accessToken}) => {
    const response = await request.get(`routines/${username}/prs`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data as IRoutine[];
  }
);

export const routineSlice = createSlice({
  name: "routines",
  initialState: routineInitialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(getRoutines.fulfilled, (state, action: PayloadAction<IRoutine[]>) => {
      state = action.payload
      return [...action.payload];
    })
  },
});