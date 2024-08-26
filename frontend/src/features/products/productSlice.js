import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_DOMAIN from "../../config";

export const fetchAllProducts = createAsyncThunk(
  "products/get-products",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_DOMAIN}/get-products`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchFilteredProducts = createAsyncThunk(
  "products/fetch-filtered-products",
  async (params, thunkAPI) => {
    try {
      const { category, subCategory } = params;
      const query = new URLSearchParams();

      if (category) query.append("category", category);
      if (subCategory) query.append("subCategory", subCategory);

      console.log(`${API_DOMAIN}/products?${query.toString()}`);

      const response = await axios.get(
        `${API_DOMAIN}/products?${query.toString()}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fecthSubCategoryWiseProducts = createAsyncThunk(
  "products/subCategory-products",
  async (subCategory, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_DOMAIN}/subCategory-products`,
        subCategory
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filteredProducts: [],
    subCategoryWiseProducts: {},
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
    clearSubCategoryWiseProducts: (state) => {
      state.subCategoryWiseProducts = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload.data;
        state.message = action.payload?.message || "All Products";
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || "Failed to fetch products.";
      })
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.filteredProducts = action.payload.data;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message;
      })
      .addCase(fecthSubCategoryWiseProducts.pending, (state, action) => {
        state.isLoading = true;
        state.subCategoryWiseProducts[action.meta.arg.subCategory] = [];
      })
      .addCase(fecthSubCategoryWiseProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.subCategoryWiseProducts[action.meta.arg.subCategory] =
          action.payload.data;
      })
      .addCase(fecthSubCategoryWiseProducts.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload?.message;
      });
  },
});

export const { resetState, clearSubCategoryWiseProducts } =
  productSlice.actions;
export const productReducer = productSlice.reducer;
