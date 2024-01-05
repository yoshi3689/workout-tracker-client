import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExercise } from "./exerciseSlice";
import { request } from "../../axios/axios";
import { ICredentials } from "./routineSlice";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface IExerciseRecord extends Omit<IExercise, 'name'> {
}

export interface IExerciseRecordMongoaggregate {
  exerciseName: string;
  exercises: IExerciseRecord[];
}

export const exerciseRecordInitialState: IExerciseRecordMongoaggregate[] = [];

export const getExerciseRecords = createAsyncThunk<
  IExerciseRecordMongoaggregate[],
  ICredentials
>(
  "exerciseRecords/getExerciseRecords",
  async ({ username, accessToken }) => {
    const response = await request.get(`exercises/${username}/exerciseRecords`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data as IExerciseRecordMongoaggregate[];
  }
);

export const exerciseRecordSlice = createSlice({
  name: "exerciseRecords",
  initialState: exerciseRecordInitialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getExerciseRecords.fulfilled, (state, action: PayloadAction<IExerciseRecordMongoaggregate[]>) => {
      state = action.payload
      return [...action.payload];
    });
  },
});