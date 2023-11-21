import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { IExercise } from "./exerciseSlice";

export interface IRoutine {
  _id: string,
  name: string,
  createdAt: Date,
  isEditing: boolean,
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
      state[newId] = { ...action.payload, _id: newId };
    },
    editRoutine: (state, action: PayloadAction<IRoutine>) => {
      state[action.payload._id] = { ...action.payload };
    },
    deleteRoutine: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { addRoutine } = RoutineSlice.actions