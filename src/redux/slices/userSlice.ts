import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { request } from "../../axios/axios";
import { RootState } from "../store";

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

export const getUser = createAsyncThunk<
  IUser,
  string
>(
  "user/getUser",
  async (username: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { user } = state.persistedReducer;
    const response = await request.get(`user/${username}`, {
      headers: { Authorization: `Bearer ${user.accessToken}` }
    });
    console.log(response)
    return response.data as IUser;
  }
);

export const updateUser = createAsyncThunk<
  IUser,
  string
>(
  "user/updateUser",
  async (username: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { user } = state.persistedReducer;
    console.log(user.accessToken)
    const response = await request.patch(`user/${username}`, {} ,{
      headers: { Authorization: `Bearer ${user.accessToken}` }
    });
    console.log(response)
    return response.data as IUser;
  }
);

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
  // extraReducers: (builder) => {
  //   builder.addCase(getUser.fulfilled, (state, action: PayloadAction<IUser>) => {
  //     state = action.payload
  //     return action.payload;
  //   })
  // },
});

export const { editUser, logout, signin, checkSigninStatus } = userSlice.actions