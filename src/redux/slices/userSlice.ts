import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoutine } from "./routineSlice";

export interface IUser {
  _id: string,
  username: string;
  email: string;
  password: string;
  createdAt: string|null;
  lastActiveAt: string|null;
  isEmailVerified: boolean;
  routines: null;
  roles?: [string];
}

export const UserInitialState: IUser|null = {
  _id: "",
  username: "",
  email: "",
  password: "",
  createdAt: "",
  lastActiveAt: "",
  isEmailVerified: false,
  routines: null,
  roles: [""],
};

export const userSlice = createSlice({
  name: "user",
  initialState: UserInitialState,
  reducers: {
    editUser: (state, action: PayloadAction<IUser>) => {
      state = { ...action.payload };
    },
    logout: (state) => {
      state = UserInitialState;
    },
    loginOrRegister: (state, action: PayloadAction<IUser>) => {
      state = action.payload;
    },
  },
});

export const { editUser, logout, loginOrRegister } = userSlice.actions