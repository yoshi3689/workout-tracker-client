import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExercise } from "./exerciseSlice";
import { request } from "../../axios/axios";
import { ICredentials } from "./routineSlice";
import { RootState } from "../store";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface IExerciseRecord extends Omit<IExercise, 'name'> {
}

export interface IExerciseLiftableWeight {
  exerciseName: string;
  liftableWeights: number[];
  dates: string[];
  count: number;
}

export const LiftableWeightInitialState: IExerciseLiftableWeight[] = [];

export const getLiftableWeightsByExercise = createAsyncThunk<
  IExerciseLiftableWeight[],
  ICredentials
>(
  "liftableWeights/getLiftableWeightsByExercise",
  async ({ username, accessToken }) => {
    const response = await request.get(`exercises/${username}/liftableWeights`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data as IExerciseLiftableWeight[];
  }
);

export const liftableWeightSlice = createSlice({
  name: "liftableWeights",
  initialState: LiftableWeightInitialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getLiftableWeightsByExercise.fulfilled, (state, action: PayloadAction<IExerciseLiftableWeight[]>) => {
      state = action.payload
      return [...action.payload];
    });
  },
});

export const selectPaginatedLiftableWeights = (state: RootState) => {
  return state.persistedReducer.liftableWeights.reduce<IExerciseLiftableWeight[][]>((acc, curr, i) => {
    const index = Math.floor(i / 6);
    if (!acc[index]) {
      acc[index] = [];
    }
    acc[index].push(curr);
    return acc;
  }, []);
}