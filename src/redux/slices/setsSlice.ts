import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateObjectId } from "../../utils/idGenerator";
import { RootState } from "../store";

export interface ISet {
  _id: string;
  rep: number;
  rest: number;
  weight: number;
}

export const setSkelton = {
  _id: "",
  rep: 0,
  rest: 0,
  weight: 0,
};

export const SetInitialState: Record<string, Record<string, ISet>> = {};

export const SetSlice = createSlice({
  name: "Sets",
  initialState: SetInitialState,
  reducers: {
    loadSets: (state, action: PayloadAction<Record<string, Record<string, ISet>>>) => {
      state = {...action.payload};
      return state;
    },
    addSet: (state, action: PayloadAction<{ set: ISet, exerciseId: string }>) => {
      const { set, exerciseId } = action.payload
      const id = generateObjectId();
      set._id = id;
      state = {
        ...state,
        [exerciseId]: {
          ...state[exerciseId],
          [id]: set
        }
      };
      return state
    },
    editSet: (state, action: PayloadAction<{ set: ISet, exerciseId: string }>) => {
      const { set, exerciseId } = action.payload
      state = {
        ...state,
        [exerciseId]: {
          ...state[exerciseId],
          [set._id]: set
        }
      };
      state = {...state}
      return state
    },
    deleteSet: (state, action: PayloadAction<{setId: string, exerciseId:string}>) => {
      delete state[action.payload.exerciseId][action.payload.setId];
    },
    deleteSets: (state, action: PayloadAction<{exerciseId:string}>) => {
      delete state[action.payload.exerciseId]
    },
    clearSets: () => {
      return SetInitialState
    },
  },
});

export const { addSet, editSet, deleteSet, loadSets, clearSets } = SetSlice.actions
export const selectSets = (state: RootState) => state.persistedReducer.sets