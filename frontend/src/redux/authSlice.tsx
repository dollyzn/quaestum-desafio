import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "./api";

const initialState = {
  loading: false,
  user: null,
  error: "",
} as initialAuthState;

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (userData: SignUpData) => {
    const response = await api.post<AuthData>(`/signup`, userData);
    return response.data.user;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData: LoginData) => {
    const response = await api.post<AuthData>(`/login`, userData);
    return response.data.user;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await api.post<Logout>(`/logout`);
  return response.data;
});

export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
  const response = await api.post<AuthData>(`/auth/refresh`);
  return response.data.user;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      signUp.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        state.user = action.payload;
        state.error = "";
      }
    );
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error.message || "Ocorreu um erro";
    });

    //login actions
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        state.user = action.payload;
        state.error = "";
      }
    );
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error.message || "Ocorreu um erro";
    });

    //logout actions
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.error = "";
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error.message || "Ocorreu um erro";
    });

    //refresh token actions
    builder.addCase(refreshToken.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      refreshToken.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        state.user = action.payload;
        state.error = "";
      }
    );
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error.message || "Ocorreu um erro";
    });
  },
});

export default authSlice.reducer;
