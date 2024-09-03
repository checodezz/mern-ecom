import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import { adminReducer } from "../features/admin/adminSlice";
import { productReducer } from "../features/products/productSlice";
import { categoryReducer } from "../features/categories/categorySlice";
import cartSlice from "../features/cart/cartSlice";
import wishlistSlice from "../features/wishlist/wishlistSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    admin: adminReducer,
    products: productReducer,
    categories: categoryReducer,
    cart: cartSlice,
    wishlist: wishlistSlice,
  },
});

export default store;
