import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoutine } from "./routineSlice";

export const newRoutineInitialState: IRoutine = {
  _id: "",
  name: "",
  username: "",
  createdAt: "",
  isEditing: true,
  exercises: [],
  muscleGroups: [],
};

export const newRoutineSlice = createSlice({
  name: "newRoutine",
  initialState: newRoutineInitialState,
  reducers: {
    clearNewRoutine: () => {
      return newRoutineInitialState;
    },
    editNewRoutine: (state, action: PayloadAction<IRoutine>) => {
      state = action.payload;
      return action.payload
    },
  },
});

export const { clearNewRoutine, editNewRoutine } = newRoutineSlice.actions