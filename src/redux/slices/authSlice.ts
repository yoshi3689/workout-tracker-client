import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { request } from "../../axios/axios";

export interface IAuth {
  accessToken: string;
  isLoggedIn: boolean;
}

export const AuthInitialState: IAuth|null = {
  accessToken: "",
  isLoggedIn: false
};

export const logout = createAsyncThunk<
  boolean,
  string
>(
  "auth/logout",
  async (username: string) => {
    await request.post(`auth/logout/`, { username });
    return true;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: AuthInitialState,
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state, action: PayloadAction<boolean>) => {
      return AuthInitialState;
    });
  },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload
      state.accessToken = accessToken
    },
    signin: (state, action: PayloadAction<IAuth>) => {
      return action.payload;
    },
    checkSigninStatus: (state, action: PayloadAction<IAuth>) => {
      return { ...state, isLoggedIn: action.payload.isLoggedIn };
    },
  },
});

export const { setCredentials, signin, checkSigninStatus } = authSlice.actions

export const selectAccessToken = (state: RootState) => state.persistedReducer.auth.accessToken
export const selectIsLoggedIn = (state: RootState) => state.persistedReducer.auth.isLoggedIn