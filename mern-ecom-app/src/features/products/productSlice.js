import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import API_DOMAIN from "../../config"

export const fetchAllProducts = createAsyncThunk("products/get-products", async(_, thunkAPI) => {
  try{
    const response = await axios.get(`${API_DOMAIN}/get-products`)
    return response.data
  }catch(error){
    return thunkAPI.rejectWithValue(error.response.data);
  }
})


const productSlice = createSlice({
    name: "products",
    initialState: {
      products: [],
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
        builder.addCase(fetchAllProducts.pending, (state) => {
          state.isLoading = true
        }).addCase(fetchAllProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.products = action.payload.data;
          state.message = action.payload?.message || "All Products";
        }).addCase(fetchAllProducts.rejected, (state, action) => {
          state.isSuccess = false;
          state.isError = true;
          state.message = action.payload?.message || "Failed to fetch products."
        })
    }
    
});
  
  export const {resetState} = productSlice.actions;
  export const productReducer = productSlice.reducer;
  