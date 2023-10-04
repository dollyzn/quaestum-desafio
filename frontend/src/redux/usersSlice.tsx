import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "./api";

const initialState = {
  loading: true,
  users: [],
  error: "",
} as initialState;

export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  return api.get<User[]>(`/users`).then((response) => response.data);
});

export const addUser = createAsyncThunk(
  "user/addUser",
  async (userData: CreateUser) => {
    const response = await api.post<User>("/users", userData);
    return response.data;
  }
);

export const editUser = createAsyncThunk(
  "user/editUser",
  async ({ id, userData }: { id: string; userData: UpdateUser }) => {
    const response = await api.patch<User>(`/users/${id}`, userData);
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id: string) => {
    const response = await api.delete<User>(`/users/${id}`);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
        state.error = "";
      }
    );
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message || "Ocorreu um erro";
    });

    // addUser actions
    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.users.push(action.payload);
      state.error = "";
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.message || "Ocorreu um erro ao adicionar o usuário";
    });

    // editUser actions
    builder.addCase(editUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      editUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users = state.users.map((user) => {
          if (user.id === action.payload.id) {
            return action.payload;
          }
          return user;
        });
        state.error = "";
      }
    );
    builder.addCase(editUser.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.message || "Ocorreu um erro ao editar o usuário";
    });

    // deleteUser actions
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      deleteUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users = state.users.filter(
          (user) => user.id !== action.payload.id
        );
        state.error = "";
      }
    );
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.message || "Ocorreu um erro ao deletar o usuário";
    });
  },
});

export default userSlice.reducer;
