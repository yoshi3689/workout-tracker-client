import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { request } from "../../axios/axios";
import { RootState } from "../store";

export interface IAuth {
  accessToken: string;
  isLoggedIn?: boolean;
}

export const AuthInitialState: IAuth|null = {
  accessToken: "",
  isLoggedIn: false
};

export const authSlice = createSlice({
  name: "auth",
  initialState: AuthInitialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload
      state.accessToken = accessToken
    },
    logout: (state) => {
      return AuthInitialState;
    },
    signin: (state, action: PayloadAction<IAuth>) => {
      return action.payload;
    },
    checkSigninStatus: (state, action: PayloadAction<IAuth>) => {
      return { ...state, isLoggedIn: action.payload.isLoggedIn };
    },
  },
});

export const { setCredentials, logout, signin, checkSigninStatus } = authSlice.actions

export const selectAccessToken = (state: RootState) => state.persistedReducer.auth.accessToken
export const selectIsLoggedIn = (state: RootState) => state.persistedReducer.auth.isLoggedIn