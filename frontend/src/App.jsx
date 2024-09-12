import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "./features/user/userSlice";
import { authResetState } from "./features/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, isSuccess, isError } = useSelector((state) => state.auth);
  const [shouldReload, setShouldReload] = useState(false);
  const [key, setKey] = useState(0); // To force component re-render if needed

  // Handle success/error notifications and trigger re-render without full page reload
  useEffect(() => {
    if (isSuccess) {
      toast.success(message, {
        autoClose: 2000,
        position: "bottom-right",
        onClose: () => {
          setShouldReload(true); // Set flag to trigger re-fetch
        },
      });
    } else if (isError) {
      toast.error(message, {
        autoClose: 2000,
        position: "bottom-right",
        onOpen: () => {
          setShouldReload(false); // Avoid reload on error
        },
      });
    }
    dispatch(authResetState()); // Reset state after handling success/error
  }, [isSuccess, isError, message, dispatch]);

  // Re-fetch user details instead of window.location.reload
  useEffect(() => {
    if (shouldReload) {
      setTimeout(() => {
        dispatch(fetchUserDetails()); // Re-fetch user data
        setShouldReload(false); // Reset flag after fetching
      }, 200);
    }
  }, [shouldReload, dispatch]);

  // Initial fetch of user details
  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <Header key={key} /> {/* Optional key to force re-render */}
      <main className="container-fluid px-4 my-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
