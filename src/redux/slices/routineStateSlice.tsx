import { PayloadAction, createSlice} from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IRoutineState {
  created: boolean;
  modified: boolean;
  date: string;
};
export const routineStateInitialState : IRoutineState = {
  created:false,
  modified:false,
  date: "",
};

export const routineStateSlice = createSlice({
  name: "newRoutine",
  initialState: routineStateInitialState,
  reducers: {
    modifyRoutineState: (state, action: PayloadAction<IRoutineState>) => {
      state = action.payload;
      return action.payload
    },
  },
});

export const { modifyRoutineState } = routineStateSlice.actions

export const selectRoutineState = (state: RootState) => state.persistedReducer.routineState