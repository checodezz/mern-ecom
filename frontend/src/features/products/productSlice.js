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

// filter products by category, subCategory and search query
export const fetchFilteredProducts = createAsyncThunk(
  "products/fetch-filtered-products",
  async (params, thunkAPI) => {
    try {
      const { category, subCategory, q } = params;
      const query = new URLSearchParams();

      if (category) query.append("category", category);
      if (subCategory) query.append("subCategory", subCategory);
      if (q) query.append("q", q);

      // console.log("query:", query);
      // console.log(`${API_DOMAIN}/products?${query?.toString()}`);

      const response = await axios.get(
        `${API_DOMAIN}/products?${query.toString()}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchSubCategoryWiseProducts = createAsyncThunk(
  "products/subCategory-products",
  async ({ subCategory }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_DOMAIN}/subCategory-products`, {
        subCategory,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// product details
export const fetchProductDetails = createAsyncThunk(
  "products/product-details",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.post(`${API_DOMAIN}/product-details`, {
        productId,
      });
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
    productDetails: {},
    productDetailsActiveImage: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: null,
    filters: {
      sortByPrice: "",
      selectedCategories: [],
      selectedSubCategories: [],
      rating: "",
      minPrice: 0,
      maxPrice: 10000,
    },
  },
  reducers: {
    productResetState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    clearSubCategoryWiseProducts: (state) => {
      state.subCategoryWiseProducts = {};
    },
    setProductDetailsActiveImage: (state, action) => {
      state.productDetailsActiveImage = action.payload;
    },
    setFiltersSortByPrice: (state, action) => {
      const sortingMethod = action.payload;
      state.filters.sortByPrice = sortingMethod;
      const products = [...state.filteredProducts];
      const sortedProducts = products.sort((a, b) =>
        sortingMethod === "asc"
          ? a.sellingPrice - b.sellingPrice
          : b.sellingPrice - a.sellingPrice
      );
      state.filteredProducts = sortedProducts;
    },
    setFiltersSelectedCategories: (state, action) => {
      const selectedCategories = action.payload;
      state.filters.selectedCategories = selectedCategories;
      if (selectedCategories.length > 0) {
        const products = JSON.parse(JSON.stringify(state.products));
        const filterProducts = products.filter((product) =>
          selectedCategories.includes(product.category)
        );
        state.filteredProducts = filterProducts;
      }
    },

    setFiltersRating: (state, action) => {
      const selectedRating = action.payload;
      state.filters.rating = selectedRating;
      const products = JSON.parse(JSON.stringify(state.filteredProducts));
      const filterProducts = products?.filter(
        (product) => product.rating >= selectedRating
      );
      state.filteredProducts = filterProducts;
    },
    setMinMaxPrice: (state, action) => {
      state.filters.minPrice = action.payload.minPrice;
      state.filters.maxPrice = action.payload.maxPrice;
      // console.log(state.filters.minPrice, state.filters.maxPrice);
    },

    setFiltersPrice: (state, action) => {
      state.filters.minPrice = action.payload.minPrice;
      state.filters.maxPrice = action.payload.maxPrice;
      const products = JSON.parse(JSON.stringify(state.filteredProducts));
      const filterProducts = products?.filter(
        (product) =>
          product.price >= state.filters.minPrice &&
          product.price <= state.filters.maxPrice
      );
      state.filteredProducts = filterProducts;
    },
    clearAllFilters: (state) => {
      state.filters = {
        sortByPrice: "",
        selectedCategories: [],
        rating: "",
        minPrice: "0",
        maxPrice: "10000",
      };
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
        // console.log(state.filteredProducts);
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message;
      })
      .addCase(fetchSubCategoryWiseProducts.pending, (state, action) => {
        state.isLoading = true;
        state.subCategoryWiseProducts[action.meta.arg.subCategory] = [];
      })
      .addCase(fetchSubCategoryWiseProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.subCategoryWiseProducts[action.meta.arg.subCategory] =
          action.payload.data;
      })
      .addCase(fetchSubCategoryWiseProducts.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload?.message;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload?.message;
      });
  },
});

export const {
  productResetState,
  clearSubCategoryWiseProducts,
  setProductDetailsActiveImage,
  setFiltersSortByPrice,
  setFiltersSelectedCategories,
  setFiltersRating,
  setMinMaxPrice,
  setFiltersPrice,
  clearAllFilters,
} = productSlice.actions;
export const productReducer = productSlice.reducer;
