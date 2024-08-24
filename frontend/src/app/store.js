import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import { adminReducer } from "../features/admin/adminSlice";
import { productReducer } from "../features/products/productSlice";
import { categoryReducer } from "../features/categories/categorySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    admin: adminReducer,
    products: productReducer,
    categories: categoryReducer
  },
});

export default store;
