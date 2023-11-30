import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoutine } from "./routineSlice";

export const newRoutineInitialState: IRoutine = {
  _id: "",
  name: "",
  username: "",
  createdAt: new Date().toISOString(),
  isEditing: true,
  exercises: [],
};

export const newRoutineSlice = createSlice({
  name: "newRoutine",
  initialState: newRoutineInitialState,
  reducers: {
    clearNewRoutine: (state) => {
      state = newRoutineInitialState;
      return newRoutineInitialState;
    },
    editNewRoutine: (state, action: PayloadAction<IRoutine>) => {
      state = action.payload;
      return action.payload
    },
  },
});

export const { clearNewRoutine, editNewRoutine } = newRoutineSlice.actions