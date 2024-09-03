import { Outlet, useNavigate } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "./features/user/userSlice";
import { toast } from "react-toastify";
import { authResetState } from "./features/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, isSuccess, isError } = useSelector((state) => state.auth);

  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message, {
        autoClose: 2000,
        onClose: () => {
          setShouldReload(true);
        },
      });
    } else if (isError) {
      toast.error(message, {
        autoClose: 2000,
        onOpen: () => {
          setShouldReload(false);
        },
        style: { backgroundColor: "#F44336", color: "white" },
      });
    }
    dispatch(authResetState());
  }, [isSuccess, isError, message, dispatch, navigate]);

  useEffect(() => {
    if (shouldReload) {
      setTimeout(() => {
        window.location.reload();
        setShouldReload(false);
      }, 200);
    }
  }, [shouldReload]);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
