import { createAsyncThunk, createSlice, nanoid, PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { IExercise } from "./exerciseSlice";
import axios from "axios";

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
  async (data: IRoutine) => {
    // const newId = nanoid();
    const response = await axios.post(
      `${BASE}/api/routines`,
      {
        ...data,
      },
      { headers: { Authorization: `Bearer ${data._id}` } }
    );
    // console.log(response);
    return response.data.response;
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
    console.log(response);
    return response.data as IRoutine[];
  }
);

export const RoutineSlice = createSlice({
  name: "routines",
  initialState: RoutineInitialState,
  reducers: {
    // addRoutine: (state, action: PayloadAction<IRoutine>) => {
    //   const newId = nanoid();
    //   state[newId] = { ...action.payload, _id: newId };
    // },
    // editRoutine: (state, action: PayloadAction<IRoutine>) => {
    //   state[action.payload._id] = { ...action.payload };
    // },
    // deleteRoutine: (state, action: PayloadAction<string>) => {
    //   delete state[action.payload];
    // },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getRoutines.fulfilled, (state, action: PayloadAction<IRoutine[]>) => {
      // Add user to the state array
      console.log(action.payload)
      state = action.payload
      return [...action.payload];
    })
  },
});

// export const { editRoutine, deleteRoutine } = RoutineSlice.actions