import { createAsyncThunk, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { IExercise } from "./exerciseSlice";
import axios from "axios";

export interface IRoutine {
  _id: string,
  name: string,
  createdAt: string,
  isEditing: boolean,
  exercises: Record<string, IExercise>,
}

export const RoutineInitialState: Record<string, IRoutine> = {
};

const BASE = "http://localhost:5001";

export const addRoutine = createAsyncThunk(
  "routines/addRoutine",
  async (data: IRoutine) => {
    // const newId = nanoid();
    const response = await axios.post(
      `${BASE}/api/routines`,
      {
        ...data,
        _id: "",
      },
      { headers: { Authorization: `Bearer ${data._id}` } }
    );
    console.log(response);
    return response.data.response;
  }
);
export const getRoutines = createAsyncThunk<
  Promise<IRoutine[]>,
  string | undefined
>(
  "routines/getRoutines",
  async (accessToken: string | undefined) => {
    const response = await axios.get(`${BASE}/api/routines`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(response);
    return response.data.response;
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
    editRoutine: (state, action: PayloadAction<IRoutine>) => {
      state[action.payload._id] = { ...action.payload };
    },
    deleteRoutine: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { editRoutine, deleteRoutine } = RoutineSlice.actions