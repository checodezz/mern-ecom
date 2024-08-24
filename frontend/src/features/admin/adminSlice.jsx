import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_DOMAIN from "../../config";

// fetch all users
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

// update user role
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_DOMAIN}/update-user`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// add product
export const addProduct = createAsyncThunk("admin/add-product", async (newProduct) => {
  try {
    const response = await axios.post(`${API_DOMAIN}/upload-product`, newProduct, {
      withCredentials: true
    })
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
})

// edit product
export const editProduct = createAsyncThunk("admin/edit-product", async(productData) => {
  try{
    const response = await axios.post(`${API_DOMAIN}/update-product`, productData, {
      withCredentials: true
    })
    return response.data
  }catch(error){
    return thunkAPI.rejectWithValue(error.response.data);
  }
})


const adminSlice = createSlice({
  name: "admin",
  initialState: {
    allUsers: [],
    allProducts: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: null,
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
      }).addCase(addProduct.pending, (state) => {
        state.isLoading = true
      }).addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message || "Product added successfully."
        state.allProducts.push(action.payload.data)
      }).addCase(addProduct.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message || "Failed to add product."
      }).addCase(editProduct.pending, (state) => {
        state.isLoading = true;
      }).addCase(editProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload?.message || "Product updated successfully."
      }).addCase(editProduct.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message
      })
  },
});

export const {resetState} = adminSlice.actions;

export const adminReducer = adminSlice.reducer;
