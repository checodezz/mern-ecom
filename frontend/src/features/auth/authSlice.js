import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import API_DOMAIN from "../../config";

// Handle signup action
export const signupAsync = createAsyncThunk(
  "auth/signup",
  async (newUserData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_DOMAIN}/signup`, newUserData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Handle signin action
export const signinAsync = createAsyncThunk(
  "auth/signin",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_DOMAIN}/signin`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // console.log("Error during signin:", error.response);
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue({ message: "Network Error" });
      }
    }
  }
);

// Handle logout action
export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_DOMAIN}/logout`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {
    authResetState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message || "Signup successful!";
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload.message || "Signup failed. Please try again.";
      })
      .addCase(signinAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signinAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message || "Signin successful!";
      })
      .addCase(signinAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload.message || "Signin failed. Please try again.";
      })
      .addCase(logoutAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        console.log(action.payload.message);
        state.isLoading = false;
        state.isSuccess = true;
        state.message =
          action.payload.message || "Failed to logout. Please try again.";
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload.message || "Failed to logout. Please try again.";
      });
  },
});

export const { authResetState } = authSlice.actions;
export default authSlice.reducer;
