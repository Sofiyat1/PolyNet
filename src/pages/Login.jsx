import "./Login.css";
import loginImage from "../assets/logo.png";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { FirstContext } from "./context/context";
const Login = () => {
  let { showPassword, togglePasswordVisibility } = useContext(FirstContext)
  return (
    <div className="loginGen">
      <div className="imgDiv">
        <img src={loginImage} alt="" className="imgLogo" /> <span className="LogoText">PolyNet</span>
      </div>
      <form action="" className="formGen">
        <div className="formDiv">
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
        <div className="btnLogin btn">
          <button className="LogInBtn">Login</button>
          <p className="forgot">Forgot Password?</p>
        </div>
        <button className="CreateAcc btn">Create Account</button>
      </form>
    </div>
  );
};

export default Login;
