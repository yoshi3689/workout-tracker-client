import { createAsyncThunk, createSlice, nanoid, PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { IExercise } from "./exerciseSlice";
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
      const maxWeight = Math.max(...ss.map(s => s.weight));
      console.log(maxWeight)
      return {...e, sets: ss, maxWeight}
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
      return response.data.response as IRoutine;
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
    return response.data.response as IRoutine;
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

export const selectPaginatedRoutines = (state: RootState) => {
  return state.persistedReducer.routines.reduce<IRoutine[][]>((acc, curr, i) => {
    console.log(curr)
    const index = Math.floor(i / 6);
    if (!acc[index]) {
      acc[index] = [];
    }
    acc[index].push(curr);
    return acc;
  }, []);
}