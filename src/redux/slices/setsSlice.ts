import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

export interface ISet {
  _id: string;
  exerciseId: string;
  rep: number;
  rest: number;
  weight: number;
}

export const setSkelton = {
  _id: "",
  exerciseId: "",
  rep: 0,
  rest: 0,
  weight: 0,
};

export const SetInitialState: Record<string, ISet> = {};

export const SetSlice = createSlice({
  name: "Sets",
  initialState: SetInitialState,
  reducers: {
    addSet: (state, action: PayloadAction<ISet>) => {
      state = { ...state, [action.payload._id]: action.payload };
      return state;
    },
    editSet: (state, action: PayloadAction<ISet>) => {
      state[action.payload._id] = { ...action.payload };
      return state;
    },
    deleteSet: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { addSet, editSet, deleteSet } = SetSlice.actions