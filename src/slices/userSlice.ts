import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { IRoutine } from "./routineSlice";

export interface IUser {
  ID: string,
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  lastActiveAt: Date;
  isEmailVerified: boolean;
  routines: Record<string, IRoutine>;
  roles: [string];
}

export const UserInitialState: IUser = {
  ID: "",
  username: "",
  email: "",
  password: "",
  createdAt: new Date(),
  lastActiveAt: new Date(),
  isEmailVerified: false,
  routines: {},
  roles: [""],
};

export const userSlice = createSlice({
  name: "users",
  initialState: UserInitialState,
  reducers: {
    editUser: (state, action: PayloadAction<IUser>) => {
      state = action.payload;
    },
  },
});

export const { editUser } = userSlice.actions