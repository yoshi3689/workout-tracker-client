import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExercise } from "./exerciseSlice";
import { request } from "../../axios/axios";
import { ICredentials } from "./routineSlice";

export interface IPersonalRecord extends IExercise {
  createdAt: string;
}

export const personalRecordInitialState: IPersonalRecord[] = [];

export const getPersonalRecords = createAsyncThunk<
  IPersonalRecord[],
  ICredentials
>(
  "personalRecords/getPersonalRecords",
  async ({username, accessToken}) => {
    const response = await request.get(`exercises/${username}/personalRecords`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data as IPersonalRecord[];
  }
);

export const personalRecordSlice = createSlice({
  name: "personalRecords",
  initialState: personalRecordInitialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(getPersonalRecords.fulfilled, (state, action: PayloadAction<IPersonalRecord[]>) => {
      state = action.payload
      return [...action.payload];
    })
  },
});