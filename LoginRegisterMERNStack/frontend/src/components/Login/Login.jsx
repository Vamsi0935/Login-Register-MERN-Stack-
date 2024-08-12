import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (!res.data.success) {
        setError(res.data.message);
        dispatch(signInFailure(res.data.message));
        Swal.fire({
          title: "Error",
          text: res.data.message,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      } else {
        dispatch(signInSuccess(res.data));
        Swal.fire({
          title: "Success",
          text: "You are now logged in!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/login-success");
        });
      }
    } catch (error) {
      setError("Invalid User......");
      dispatch(signInFailure(error.message));
      Swal.fire({
        title: "Error",
        text: "Invalid User!!!",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div style={{ backgroundColor: "#77faec" }}>
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="card w-50 p-5 bg bg-light">
            <h1 className="text-center mb-4">LOGIN</h1>
            <div className="form-label mb-3">
              <label htmlFor="email">Email address</label>
              <input
                value={email}
                className="form-control"
                id="email"
                name="email"
                placeholder="e.g., vamsi@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-label mb-3 col position-relative">
              <label htmlFor="password">Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="btn position-absolute"
                style={{
                  right: "10px",
                  top: "40%",
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
              </button>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mt-3 d-flex justify-content-center">
              <button type="submit" className="btn btn-outline-success">
                Sign In
              </button>
            </div>
            <p className="text-center mt-3">
              Not Registered yet?{" "}
              <Link to={"/register"}>Create an account</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
