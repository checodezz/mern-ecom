import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginIcon from "../assets/signin.gif";
import { useEffect, useState } from "react";
import { imageToBase64 } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { authResetState, signupAsync } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, isSuccess, isError } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
    dispatch(authResetState());
  }, [isSuccess, isError, message, navigate, dispatch]);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadPhotoHandler = async (event) => {
    const file = event.target.files[0];
    const imagePic = await imageToBase64(file);
    setFormData((prevData) => ({
      ...prevData,
      profilePic: imagePic,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (formData.password === formData.confirmPassword) {
      dispatch(signupAsync(formData));
    } else {
      toast.error("Please check password and confirm password!");
      return;
    }
  };

  return (
    <section id="sign-up" className="my-5 d-flex justify-content-center">
      <div
        className="bg-white p-4 w-100 shadow-sm"
        style={{ maxWidth: "400px" }}
      >
        <div className="position-relative ">
          <div className="center-content ">
            <img
              src={formData.profilePic || loginIcon}
              className="img-fluid rounded-circle"
              alt="Login Icon"
              style={{ width: "100px", height: "100px" }}
            />
          </div>
          {!formData.profilePic && (
            <form>
              <label className="center-content">
                <div className="upload-photo bg-lightgrey cursor-pointer">
                  Upload Photo
                </div>
                <input
                  type="file"
                  name=""
                  className="visually-hidden"
                  onChange={uploadPhotoHandler}
                />
              </label>
            </form>
          )}
        </div>

        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter name"
              value={formData.name}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={formData.email}
              onChange={changeHandler}
              autoComplete="username"
              required
            />
          </div>
          <div className="mb-3 position-relative">
            <label className="form-label">Password:</label>
            <div className="d-flex ">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={formData.password}
                onChange={changeHandler}
                autoComplete="new-password"
                required
              />
              <div
                className="hidePasswordBtn fs-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <div className="mb-3 position-relative">
            <label className="form-label">Confirm Password:</label>
            <div className="d-flex ">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                className="form-control"
                placeholder="Enter confirm password"
                value={formData.confirmPassword}
                onChange={changeHandler}
                autoComplete="new-password"
                required
              />
              <div
                className="hidePasswordBtn fs-5"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <button className="btn btn-pink mt-2 mb-4 w-100 rounded-pill ">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account ?{" "}
          <Link to={"/login"} className="text-decoration-none">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUpPage;
