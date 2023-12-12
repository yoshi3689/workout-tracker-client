import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  username?: string;
  email?: string;
  accessToken: string;
  isLoggedIn?: boolean;
  createdAt?: string|null;
  lastActiveAt?: string|null;
  isEmailVerified?: boolean;
  roles?: [string];
}

export const UserInitialState: IUser|null = {
  username: "",
  email: "",
  accessToken: "",
  isLoggedIn: false,
  createdAt: "",
  lastActiveAt: "",
  isEmailVerified: false,
  roles: [""],
};

export const userSlice = createSlice({
  name: "user",
  initialState: UserInitialState,
  reducers: {
    editUser: (state, action: PayloadAction<IUser>) => {
      return { ...action.payload };
    },
    logout: (state) => {
      return UserInitialState;
    },
    signin: (state, action: PayloadAction<IUser>) => {
      return action.payload;
    },
    checkSigninStatus: (state, action: PayloadAction<IUser>) => {
      return { ...state, isLoggedIn: action.payload.isLoggedIn };
    },
  },
});

export const { editUser, logout, signin, checkSigninStatus } = userSlice.actions