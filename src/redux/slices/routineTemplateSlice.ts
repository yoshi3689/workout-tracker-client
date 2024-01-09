import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const routineTemplateInitialState: string = ""

export const routineTemplateSlice = createSlice({
  name: "routineTemplate",
  initialState: routineTemplateInitialState,
  reducers: {
    changeRoutineTemplate: (state, action: PayloadAction<string>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { changeRoutineTemplate } = routineTemplateSlice.actions
export const selectRoutineTemplate = (state: RootState) => state.persistedReducer.routineTemplate