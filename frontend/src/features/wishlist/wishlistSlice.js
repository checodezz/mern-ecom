import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_DOMAIN from "../../config";

export const getWishlistProducts = createAsyncThunk(
  "wishlist/getWishlistProducts",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_DOMAIN}/get/wishlist`, {
        withCredentials: true,
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// add product to wishlist
export const addProductToWishlist = createAsyncThunk(
  "wishlist/addProductToWishlist",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_DOMAIN}/wishlist/add-product`,
        {
          productId,
        },
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

export const getCountWishlistProducts = createAsyncThunk(
  "wishlist/countWishlistProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_DOMAIN}/wishlist/count-items`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeFromWishlistProduct = createAsyncThunk(
  "cart/removeFromWishlistProduct",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_DOMAIN}/wishlist/delete-product`,
        {
          productId,
        },
        {
          withCredentials: true,
        }
      );
      await thunkAPI.dispatch(getWishlistProducts());
      await thunkAPI.dispatch(getCountWishlistProducts());
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistProducts: [],
    wishlistProduct: null,
    wishlistProductCount: 0,
    isWishlisted: false,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {
    setIsWishlisted: (state, action) => {
      state.isWishlisted = action.payload;
    },
    wishlistResetState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getWishlistProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWishlistProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlistProducts = action?.payload.data;
      })
      .addCase(getWishlistProducts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getCountWishlistProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCountWishlistProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlistProductCount = action?.payload.data.count;
      })
      .addCase(getCountWishlistProducts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addProductToWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.message = action.payload?.message;
      })
      .addCase(addProductToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message;
      })
      .addCase(removeFromWishlistProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromWishlistProduct.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(removeFromWishlistProduct.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setIsWishlisted, wishlistResetState } = wishlistSlice.actions;
export default wishlistSlice.reducer;
