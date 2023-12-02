import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISet } from "./setsSlice";
import { generateObjectId } from "../../utils/idGenerator";

export interface IExercise {
  _id: string;
  name: string;
  muscleGroups: string[];
  sets: ISet[];
}

export const exerciseSkelton: IExercise = {
  _id: "",
  name: "",
  sets: [],
  muscleGroups: []
};

export const ExerciseInitialState: Record<string, IExercise> = {};

export const ExerciseSlice = createSlice({
  name: "Exercises",
  initialState: ExerciseInitialState,
  reducers: {
    addExercise: (state, action: PayloadAction<IExercise>) => {
      const id = generateObjectId();
      action.payload._id = id;
      state = {...state, [id]:{...action.payload}};
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