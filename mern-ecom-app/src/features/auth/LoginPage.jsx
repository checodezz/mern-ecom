import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginIcon from "../../assets/signin.gif";
import "./auth.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetState, signinAsync } from "./authSlice";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, isSuccess, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }

    dispatch(resetState());
  }, [isSuccess, isError, message, dispatch, navigate]);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(signinAsync(formData));
  };

  return (
    <section id="login">
      <div className="bg-white px-2 py-4 w-50 mx-auto">
        <div className="d-flex justify-content-center align-items-center">
          <img
            src={loginIcon}
            className="rounded-circle"
            alt="Login Icon"
            width="100px"
            height="100px"
          />
        </div>
        <form onSubmit={submitHandler}>
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
                autoComplete="current-password"
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
          <Link to={"/forgot-password"} className="d-flex justify-content-end ">
            Forgot Password ?
          </Link>
          <button className="btn btn-pink mt-2 mb-4 w-50 rounded-pill mx-auto d-flex justify-content-center align-items-center">
            Login
          </button>
        </form>
        <p>
          Don&apos;t have account ? <Link to={"/sign-up"}>Sign Up</Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
