import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  _id?: string,
  username?: string;
  email?: string;
  accessToken?: string;
  createdAt?: string|null;
  lastActiveAt?: string|null;
  isEmailVerified?: boolean;
  roles?: [string];
}

export const UserInitialState: IUser|null = {
  _id: "",
  username: "",
  email: "",
  accessToken: "",
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
    loginOrRegister: (state, action: PayloadAction<IUser>) => {
      console.log(action.payload)
      return action.payload;
    },
  },
});

export const { editUser, logout, loginOrRegister } = userSlice.actions