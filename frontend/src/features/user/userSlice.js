import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_DOMAIN from "../../config";

// fetch user details
export const fetchUserDetails = createAsyncThunk(
  "user/user-details",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_DOMAIN}/user-details`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editUserProfile = createAsyncThunk(
  "user/editUserProfile",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_DOMAIN}/edit/user-profile`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteUserAccount = createAsyncThunk(
  "user/deleteUserAccount",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_DOMAIN}/delete/user-account`,
        userId,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload?.message ||
          "Failed to fetch user details. Please try again.";
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = action.payload?.message;
      })
      .addCase(editUserProfile.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message;
      })
      .addCase(deleteUserAccount.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = action.payload?.message;
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message;
      });
  },
});

export default userSlice.reducer;
