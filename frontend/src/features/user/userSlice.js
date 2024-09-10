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

export const addEditUserAddress = createAsyncThunk(
  "user/addEditUserAddress",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_DOMAIN}/user/address`, data, {
        withCredentials: true,
      });
      console.log(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserAddresses = createAsyncThunk(
  "user/user-addresses",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_DOMAIN}/user/addresses`, {
        withCredentials: true,
      });
      // console.log(response.data);
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

export const deleteUserAddress = createAsyncThunk(
  "user/deleteUserAddress",
  async (addressId, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_DOMAIN}/delete/user/address`,
        { addressId },
        {
          withCredentials: true,
        }
      );
      // console.log(response.data);
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
    addresses: [],
    defaultAddress: null,
    otherAddresses: [],
    checkoutAddress: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {
    userResetState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    setCheckoutAddress: (state, action) => {
      state.checkoutAddress = action.payload;
    },
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
      })
      .addCase(addEditUserAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addEditUserAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload?.message;
      })
      .addCase(addEditUserAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message;
      })
      .addCase(fetchUserAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = action.payload.data;

        // Separate default address from other addresses
        state.defaultAddress = action.payload?.data.find(
          (address) => address.isDefault
        );
        state.otherAddresses = action.payload?.data.filter(
          (address) => !address.isDefault
        );
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload?.message ||
          "Failed to fetch user addresses. Please try again.";
      })
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = action.payload?.message;
        const deletedAddressId = action.payload;

        // Remove deleted address from the state
        state.addresses = state.addresses.filter(
          (address) => address._id !== deletedAddressId
        );

        // Update the default and other addresses after deletion
        state.defaultAddress = state.addresses.find(
          (address) => address.isDefault
        );
        state.otherAddresses = state.addresses.filter(
          (address) => !address.isDefault
        );
      })
      .addCase(deleteUserAddress.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message;
      });
  },
});

export const { userResetState, setCheckoutAddress } = userSlice.actions;
export default userSlice.reducer;
