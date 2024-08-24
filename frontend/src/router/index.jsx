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
import ProductDisplayPage from "../pages/ProductDisplayPage";

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
        element: <ProductDisplayPage />,
      },
    ],
  },
]);

export default routes;
