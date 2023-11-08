import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { IExercise } from "./exerciseSlice";

export interface IRoutine {
  ID: string,
  name: string,
  createdAt: Date,
  exercises: Record<string, IExercise>,
}

export const RoutineInitialState: Record<string, IRoutine> = {
  useIdHere: {
    ID: "useIdHere",
    name: "aaa",
    createdAt: new Date(),
    exercises: {},
  }
};



// {
//     Routines: {
//         [ID]: {
//             ID: string,
//             RandomizeQuestions: boolean,
//             RandomizeAnswers: boolean,
//             Blocks: string[] // array of block IDs
//         }
//     }
//     Blocks: {
//         [ID]: {
//             ID: string, 
//             Title: string,  
//             Questions: string[] // array of question IDs
//         }
//     },
//     Questions: // etc.
// }
// export const UNINITIALIZED = "UNINITIALIZED"
// type State = typeof RoutineInitialState | typeof UNINITIALIZED | null;

// // Define your initial state
// const initialState: State  = UNINITIALIZED;

export const RoutineSlice = createSlice({
  name: "Routines",
  initialState: RoutineInitialState,
  reducers: {
    addRoutine: (state, action: PayloadAction<IRoutine>) => {
      const newId = nanoid();
      state[newId] = { ...action.payload, ID: newId };
    },
    editRoutine: (state, action: PayloadAction<IRoutine>) => {
      state[action.payload.ID] = { ...action.payload };
    },
    deleteRoutine: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { addRoutine } = RoutineSlice.actions