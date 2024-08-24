import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_DOMAIN from "../../config";

// get categories
export const fetchAllCategories = createAsyncThunk(
  "categories/get-categories",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_DOMAIN}/get-categories`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// add categoory
export const addCategory = createAsyncThunk(
  "categories/add-category",
  async (newCategory, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_DOMAIN}/add-category`,
        newCategory,
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

// edit category
export const editCategory = createAsyncThunk(
  "admin/edit-category",
  async (categoryData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_DOMAIN}/update-category`,
        categoryData,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// delete category
export const deleteCategory = createAsyncThunk(
  "admin/delete-category",
  async (categoryId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${API_DOMAIN}/delete-category/${categoryId}`,
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

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
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
      .addCase(fetchAllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload.data;
        state.message = action.payload?.message || "All Categories";
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message =
          action.payload?.message || "Failed to fetch categories.";
      })
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message =
          action.payload.message || "Category added successfully.";
        state.categories.push(action.payload.data);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message || "Failed to add category.";
      })
      .addCase(editCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message =
          action.payload?.message || "Category updated successfully.";
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message =
          action.payload?.message || "Category deleted successfully.";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message;
      });
  },
});

export const { resetState } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
