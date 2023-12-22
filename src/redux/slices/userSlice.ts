import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { request } from "../../axios/axios";
import { RootState } from "../store";

export interface IUser {
  username?: string;
  email?: string;
  createdAt?: string|null;
  lastActiveAt?: string|null;
  isEmailVerified?: boolean;
  roles?: [string];
}

export const UserInitialState: IUser|null = {
  username: "",
  email: "",
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
    const { auth } = state.persistedReducer;
    const response = await request.get(`user/${username}`, {
      headers: { Authorization: `Bearer ${auth.accessToken}` }
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
    const { auth } = state.persistedReducer;
    const response = await request.patch(`user/${username}`, {
      
    } ,{
      headers: { Authorization: `Bearer ${auth.accessToken}` }
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
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getUser.fulfilled, (state, action: PayloadAction<IUser>) => {
  //     state = action.payload
  //     return action.payload;
  //   })
  // },
});

export const { editUser, } = userSlice.actions