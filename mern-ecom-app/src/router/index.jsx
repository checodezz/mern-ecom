import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import LoginPage from "../features/auth/LoginPage";
import ForgotPasswordPage from "../features/auth/ForgotPasswordPage";
import SignUpPage from "../features/auth/SignUpPage";

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
    ],
  },
]);

export default routes;
