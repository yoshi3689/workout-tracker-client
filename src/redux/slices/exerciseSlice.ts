import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ISet } from "./setsSlice";

export interface IExercise {
  _id: string;
  name: string;
  muscleGroups: string[];
  sets: ISet[];
}

export const ExerciseInitialState: Record<string, IExercise> = {};

export const ExerciseSlice = createSlice({
  name: "Exercises",
  initialState: ExerciseInitialState,
  reducers: {
    addExercise: (state, action: PayloadAction<IExercise>) => {
      console.log(action.payload);
      state = {...state, [action.payload._id]:action.payload};
      return state;
    },
    editExercise: (state, action: PayloadAction<IExercise>) => {
      state[action.payload._id] = action.payload;
      return state;
    },
    deleteExercise: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
      return state;
    },
  },
});

export const { addExercise, editExercise, deleteExercise } = ExerciseSlice.actions