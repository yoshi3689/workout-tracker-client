import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISet } from "./setsSlice";
import { generateObjectId } from "../../utils/idGenerator";

export interface IExercise {
  _id: string;
  name: string;
  muscleGroups: string[];
  sets: ISet[];
  maxWeight: number;
}

export const exerciseSkelton: IExercise = {
  _id: "",
  name: "",
  sets: [],
  muscleGroups: [],
  maxWeight: 0
};

export const ExerciseInitialState: Record<string, IExercise> = {};

export const ExerciseSlice = createSlice({
  name: "Exercises",
  initialState: ExerciseInitialState,
  reducers: {
    loadExercises: (state, action: PayloadAction<Record<string, IExercise>>) => {
      state = {...action.payload};
      return state;
    },
    addExercise: (state, action: PayloadAction<IExercise>) => {
      const id = generateObjectId();
      action.payload._id = id;
      state = { ...state, [id]: { ...action.payload } };
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
    clearExercises: () => {
      return ExerciseInitialState;
    },
  },
});

export const { addExercise, editExercise, deleteExercise, loadExercises, clearExercises } = ExerciseSlice.actions