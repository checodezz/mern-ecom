import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_DOMAIN from "../../config";

export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_DOMAIN}/all-user`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_DOMAIN}/update-user`, data, {
        withCredentials: true,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    allUsers: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allUsers = action.payload.data;
        state.message = action.payload.message || "Users not found.";
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message || "Failed to fetch all users.";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = action.payload?.message || "User updated.";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || "Failed to update User";
      });
  },
});

export const adminReducer = adminSlice.reducer;
