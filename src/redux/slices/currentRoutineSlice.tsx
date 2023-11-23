import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExercise } from "./exerciseSlice";

export interface IRoutine {
  _id: string,
  name: string,
  createdAt: string,
  isEditing: boolean,
  exercises: Record<string, IExercise>,
}

export const currentRoutineInitialState: IRoutine = {
  _id: "",
  name: "",
  createdAt: new Date().toISOString(),
  isEditing: true,
  exercises: {},
};

export const currentRoutineSlice = createSlice({
  name: "currentRoutine",
  initialState: currentRoutineInitialState,
  reducers: {
    clearCurrentRoutine: (state) => {
      state = currentRoutineInitialState;
      return currentRoutineInitialState;
    },
    editCurrentRoutine: (state, action: PayloadAction<IRoutine>) => {
      state = action.payload;
      return action.payload
    },
  },
});

export const { clearCurrentRoutine, editCurrentRoutine } = currentRoutineSlice.actions