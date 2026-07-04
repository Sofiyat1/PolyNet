import { supabase } from '../lib/supabase'
import "./Login.css";
import loginImage from "../assets/logo.png";
import { useState, useContext, useEffect } from "react";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { FirstContext } from "./context/context";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  let { showPassword, togglePasswordVisibility } = useContext(FirstContext)
  const [loginError, setLoginError] = useState("");
  let navigate = useNavigate()
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log("Session:", session);

      // if (session) {
      //   console.log("Redirecting...");
      //   navigate("/homepage");
      // }
    };

    checkUser();
  }, [navigate]);
  // form validation
  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email must be a valid email format").required("Email is required"),
      password: Yup.string().required('Password is required').min(6, "Password must be at least 6 characters long")
        .matches(/[a-zA-Z]/, "Password must include at least one letter")
        .matches(/[0-9!@#$%^&*]/, "Password must include at least one number or special character")
    })
    ,
    onSubmit: async (values) => {

      try {
        setLoginError("");
        setIsLoading(true);

        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (error) {
          setLoginError(error.message);
          return;
        }

        navigate("/homepage");

      } catch (err) {
        console.log(err);
        setLoginError("Something went wrong. Please try again.");

      } finally {
        setIsLoading(false);
      }
    }

  })
  return (
    <div className="loginGen">
      {loginError && (
        <p className="error">{loginError}</p>
      )}
      <div className="topSection">
        <div className="imgDiv">
          <img src={loginImage} className="imgLogo" />
          <span className="LogoText">PolyNet</span>
        </div>

        <div className="welcomeText">
          <h2>Welcome Back</h2>
          <p>Sign in to continue</p>
        </div>
      </div>
      <form action="" className="formGen" onSubmit={formik.handleSubmit}>
        <div className="formDiv">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="name@gmail.com" name='email' onBlur={formik.handleBlur}
            className="inputBackground" onChange={formik.handleChange} value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="error">{formik.errors.email}</p>
          )}
        </div>
        <div>
          <div className="">
            <label htmlFor="">Password</label>
            {/* <p>Forgot password?</p> */}
          </div>

          <div className="input-wrap">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password" name='password' onBlur={formik.handleBlur}
              className="inputBackground" onChange={formik.handleChange} id="password" value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="error">{formik.errors.password}</p>
            )}
            <div className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <div className="btnLogin btn">
          <button className="LogInBtn" type="submit" disabled={isLoading} >  {isLoading ? <FaSpinner className='spinner' /> : "Log in"}
          </button>
          <p className="forgot" onClick={() => navigate('/forgot-password')}>
            Forgot Password?
          </p>
        </div>
        <button type="button" className="CreateAcc signup" onClick={() => navigate('/signup')}>Create Account</button>
      </form>
    </div>
  );
};

export default Login;
