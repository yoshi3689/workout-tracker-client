import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

export interface ISet {
  _id: string;
  rep: number;
  rest: number;
  weight: number;
}

export const SetInitialState: Record<string, ISet> = {};

export const SetSlice = createSlice({
  name: "Sets",
  initialState: SetInitialState,
  reducers: {
    addSet: (state, action: PayloadAction<ISet>) => {
      // do i need to set a new id or not?
      const newId = nanoid();
      state[newId] = { ...action.payload, _id: newId };
    },
    editSet: (state, action: PayloadAction<ISet>) => {
      state[action.payload._id] = { ...action.payload };
    },
    deleteSet: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { addSet, editSet, deleteSet } = SetSlice.actions