import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { api } from "@/services/api";
import { AxiosError } from "axios";

import { toast } from "react-toastify";
import { toastOptions } from "@/configs/toastOptions";

type AuthUser = {
  id: string;
  username: string;
  password: string;
};

type RequestState = "idle" | "loading" | "success" | "error";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  status: RequestState;
  error: string | undefined;
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  error: undefined,
};

export const authThunk = createAsyncThunk(
  "auth/session",
  async ({ username, password }: AuthUser) => {
    try {
      const response = await api.post("/api/auth/sessions", {
        username,
        password,
      });
      const { user, token } = response.data;

      localStorage.setItem("@Chirpify:token", token);
      localStorage.setItem("@Chirpify:user", JSON.stringify(user));

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return { user, token };
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error(error.response.data.message, toastOptions);
        } else {
          toast.error("Registration failed. Please try again.", toastOptions);
        }
      }
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: AuthUser; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      localStorage.removeItem("@Chirpify:user");
      localStorage.removeItem("@Chirpify:token");

      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authThunk.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(authThunk.fulfilled, (state, action) => {
      state.status = "success";

      if (action.payload) {
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    });
    builder.addCase(authThunk.rejected, (state, action) => {
      state.status = "error";

      state.error = action.error.message;
    });
  },
});

export const { login, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth.user;

export default authSlice.reducer;
