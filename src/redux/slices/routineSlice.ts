import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { IExercise } from "./exerciseSlice";

export interface IRoutine {
  ID: string,
  name: string,
  createdAt: Date,
  exercises: Record<string, IExercise>,
}

export const RoutineInitialState: Record<string, IRoutine> = {
};

export const RoutineSlice = createSlice({
  name: "Routines",
  initialState: RoutineInitialState,
  reducers: {
    addRoutine: (state, action: PayloadAction<IRoutine>) => {
      const newId = nanoid();
      state[newId] = { ...action.payload, ID: newId };
    },
    editRoutine: (state, action: PayloadAction<IRoutine>) => {
      state[action.payload.ID] = { ...action.payload };
    },
    deleteRoutine: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { addRoutine } = RoutineSlice.actions