import "./Login.css";
import loginImage from "../assets/logo.png";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext } from "react";
import { FirstContext } from "./context/context";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
const Login = () => {
  let { showPassword, togglePasswordVisibility } = useContext(FirstContext)

  let navigate = useNavigate()

  // form validation
  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email must be a valid email format").required("Email is required"),
      password: Yup.string().required('Password is required').min(6, 'Password must be a minimum of 6 characters')
    })
    ,
    onSubmit: values => {
      console.log(values);

      navigate('/homepage')
    }
  })
  return (
    <div className="loginGen">
      <div className="imgDiv">
        <img src={loginImage} alt="" className="imgLogo" /> <span className="LogoText">PolyNet</span>
      </div>
      <form action="" className="formGen" onSubmit={formik.handleSubmit}>
        <div className="formDiv">
          <label htmlFor="">Email</label>
          <input type="email" placeholder="Email" name='email' className="inputBackground" onChange={formik.handleChange} />
          {formik.touched.email && formik.errors.email && (
            <p className="error">{formik.errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="">Password</label>
          <div className="input-wrap">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password" name='password'
              className="inputBackground" onChange={formik.handleChange}
            />
            {formik.touched.password && formik.errors && (
              <p className="error">{formik.errors.password}</p>
            )}
            <div className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <div className="btnLogin btn">
          <button className="LogInBtn" type="submit" >Login</button>
          <p className="forgot">Forgot Password?</p>
        </div>
        <button className="CreateAcc btn">Create Account</button>
      </form>
    </div>
  );
};

export default Login;
