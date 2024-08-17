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
        state.isSuccess = true;
        state.user = action.payload.data;
        state.message =
          action.payload?.message || "User details fetched successfully.";
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload?.message ||
          "Failed to fetch user details. Please try again.";
      });
  },
});

export default userSlice.reducer;
