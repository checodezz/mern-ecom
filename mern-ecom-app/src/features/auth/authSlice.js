import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const domain = "http://localhost:8080/api";

// Define user roles (if needed for your logic)
const ROLE = {
  ADMIN: "ADMIN",
  GENERALUSER: "GENERALUSER",
};

// Handle signup action
export const signupAsync = createAsyncThunk(
  "auth/signup",
  async (newUserData, thunkAPI) => {
    try {
      const response = await axios.post(`${domain}/signup`, newUserData);
      localStorage.setItem("token", response.data.token);
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
      const response = await axios.post(`${domain}/signin`, formData, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.token);
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
      const response = await axios.get(`${domain}/logout`, {
        withCredentials: true,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {
    resetState: (state) => {
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
        state.token = action.payload.token;
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
        state.token = action.payload.token;
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

export const { resetState } = authSlice.actions;
export default authSlice.reducer;
