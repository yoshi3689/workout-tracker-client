import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

export interface ISet {
  ID: string,
  rep: number;
  rest: number;
  weight: number;
}

export const SetInitialState: Record<string, ISet> = {
  useIdHere: {
    ID: "useIdHere",
    rep: 0,
    rest: 0,
    weight: 0,
  }
};

export const SetSlice = createSlice({
  name: "Sets",
  initialState: SetInitialState,
  reducers: {
    addSet: (state, action: PayloadAction<ISet>) => {
      const newId = nanoid();
      state[newId] = { ...action.payload, ID: newId };
    },
    editSet: (state, action: PayloadAction<ISet>) => {
      state[action.payload.ID] = { ...action.payload };
    },
    deleteSet: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { addSet } = SetSlice.actions