import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_DOMAIN from "../../config";

// add product to cart
export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_DOMAIN}/cart/add-item`,
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

export const getCountCartItems = createAsyncThunk(
  "cart/countCartItems",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_DOMAIN}/cart/count-items`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_DOMAIN}/cart/items`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// update cart item
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ cartItemId, quantity }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_DOMAIN}/cart/update-item`,
        {
          cartItemId,
          quantity,
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

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (cartItemId, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_DOMAIN}/cart/delete-item`,
        {
          cartItemId,
        },
        {
          withCredentials: true,
        }
      );
      await thunkAPI.dispatch(getCartItems());
      await thunkAPI.dispatch(getCountCartItems());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clear-cart",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_DOMAIN}/clear-cart`, {
        withCredentials: true,
      });
      console.log(response.data);
      await thunkAPI.dispatch(getCountCartItems());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartItem: null,
    isProductInCart: false,
    totalCartItems: null,
    totalQuantity: null,
    totalPrice: null, // sellingPrice * qty
    totalMRP: null,
    totalDiscount: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {
    cartResetState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    calculateTotalQuantity: (state) => {
      state.totalQuantity = state?.cartItems?.reduce(
        (acc, curr) => acc + curr?.quantity,
        0
      );
    },
    calculateTotalPrice: (state) => {
      state.totalPrice = state?.cartItems?.reduce(
        (acc, curr) => acc + curr?.productId?.sellingPrice * curr?.quantity,
        0
      );
      // console.log(state.totalPrice);
    },
    calculateTotalMRP: (state) => {
      state.totalMRP = state?.cartItems?.reduce(
        (acc, curr) => acc + curr?.productId?.price,
        0
      );
    },
    calculateTotalDiscount: (state) => {
      state.totalDiscount = state.totalMRP - state.totalPrice;
    },
    setIsProductInCart: (state, action) => {
      state.isProductInCart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cartItem = action.payload.data;
        state.message = action.payload?.message;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message;
      })
      .addCase(getCountCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCountCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalCartItems = action.payload?.data?.count;
      })
      .addCase(getCountCartItems.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItem.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCartItem.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        // console.log(action.payload?.message);
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload?.message;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message;
      })
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.totalCartItems = 0;
      })
      .addCase(clearCart.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  cartResetState,
  calculateTotalQuantity,
  calculateTotalPrice,
  calculateTotalMRP,
  calculateTotalDiscount,
  setIsProductInCart,
} = cartSlice.actions;
export default cartSlice.reducer;
