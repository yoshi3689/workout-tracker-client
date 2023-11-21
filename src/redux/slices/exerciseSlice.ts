import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ISet } from "./setsSlice";

export interface IExercise {
  _id: string;
  name: string;
  muscleGroups: [string];
  sets: Record<string, ISet>;
}

export const ExerciseInitialState: Record<string, IExercise> = {
  useIdHere: {
    _id: "useIdHere",
    name: "aaa",
    muscleGroups: ['biceps'],
    sets: {}
  }
};

export const ExerciseSlice = createSlice({
  name: "Exercises",
  initialState: ExerciseInitialState,
  reducers: {
    addExercise: (state, action: PayloadAction<IExercise>) => {
      const newId = nanoid();
      state[newId] = { ...action.payload, _id: newId };
    },
    editExercise: (state, action: PayloadAction<IExercise>) => {
      state[action.payload._id] = { ...action.payload };
    },
    deleteExercise: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { addExercise, editExercise, deleteExercise } = ExerciseSlice.actions