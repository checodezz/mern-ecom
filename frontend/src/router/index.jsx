import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import SignUpPage from "../pages/SignUpPage";
import AdminPanelPage from "../pages/AdminPanelPage";
import AllUsers from "../features/admin/AllUsersPage";
import AllProducts from "../features/admin/AllProductsPage";
import AllCategoriesPage from "../features/admin/AllCategoriesPage";
import ProductsDisplayPage from "../pages/ProductsDisplayPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CartPage from "../pages/CartPage";
import WishlistPage from "../pages/WishlistPage";
import UserProfilePage from "../pages/UserProfilePage";
import UserDashboard from "../features/user/UserDashboard";
import EditProfile from "../features/user/EditProfile";
import UserOrders from "../features/user/UserOrders";
import UserAddress from "../features/user/UserAddress";
import UserDeleteAccount from "../features/user/UserDeleteAccount";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
      {
        path: "admin-panel",
        element: <AdminPanelPage />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
          {
            path: "all-categories",
            element: <AllCategoriesPage />,
          },
        ],
      },
      {
        path: "products",
        element: <ProductsDisplayPage />,
      },
      {
        path: "products/details/:productId",
        element: <ProductDetailsPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "wishlist",
        element: <WishlistPage />,
      },
      {
        path: "my",
        element: <UserProfilePage />,

        children: [
          {
            path: "dashboard",
            element: <UserDashboard />,
          },
          {
            path: "profile/edit",
            element: <EditProfile />,
          },
          {
            path: "orders",
            element: <UserOrders />,
          },
          {
            path: "address",
            element: <UserAddress />,
          },
          {
            path: "user/delete",
            element: <UserDeleteAccount />,
          },
        ],
      },
    ],
  },
]);

export default routes;
