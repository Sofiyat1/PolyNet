import "./Login.css";
import loginImage from "../assets/login.png";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
const Login = () => {
  let [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="loginGen">
      <div className="imgDiv">
        <img src={loginImage} alt="" />
      </div>
      <form action="" className="formDiv">
        <div>
          <label htmlFor="">Email</label>
          <input type="email" placeholder="Email" className="inputBackground" />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <div className="input-wrap">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="inputBackground"
            />
            <div className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <div className="btn">
          <button className="LogInBtn">Login</button>
          <p className="forgot">Forgot Password?</p>
        </div>
        <button className="CreateAcc">Create Account</button>
      </form>
    </div>
  );
};

export default Login;
