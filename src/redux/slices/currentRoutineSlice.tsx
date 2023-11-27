import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExercise } from "./exerciseSlice";
import { IRoutine } from "./routineSlice";

export const currentRoutineInitialState: IRoutine = {
  _id: "",
  name: "",
  username: "",
  createdAt: new Date().toISOString(),
  isEditing: true,
  exercises: [],
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