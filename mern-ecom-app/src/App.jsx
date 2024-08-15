import { Outlet, useNavigate } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "./features/user/userSlice";
import { toast } from "react-toastify";
import { resetState } from "./features/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, isSuccess, isError } = useSelector((state) => state.auth);
  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message, {
        autoClose: 2000,
        position: "bottom-right",
        onClose: () => {
          setShouldReload(true);
        },
      });
    } else if (isError) {
      toast.error(message, {
        autoClose: 2000,
        position: "bottom-right",
        onOpen: () => {
          setShouldReload(false);
        },
      });
    }
    dispatch(resetState());
  }, [isSuccess, isError, message, dispatch, navigate]);

  useEffect(() => {
    if (shouldReload) {
      setTimeout(() => {
        window.location.reload();
        setShouldReload(false); // Reset flag after reloading
      }, 200); // Match the autoClose duration
    }
  }, [shouldReload]);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <Header />
      <main className="container-fluid px-4 my-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
