import { supabase } from '../lib/supabase'
import "./Login.css";
import loginImage from "../assets/logo.png";
import { useState, useContext, useEffect } from "react";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { FirstContext } from "./context/context";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  let { showPassword, togglePasswordVisibility } = useContext(FirstContext)
  const [loginError, setLoginError] = useState("");
  let navigate = useNavigate()
  // resend button
  const [showResend, setShowResend] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
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
          switch (error.message) {
            case "Invalid login credentials":
              setLoginError("Incorrect email or password.");
              setShowResend(false);
              break;

            case "Email not confirmed":
              setLoginError("Email not verified.");
              setShowResend(true);
              break;

            default:
              setLoginError("Unable to sign in. Please try again.");
              setShowResend(false);
          }

          return;
        }
        toast.success("Login successful!");
        navigate("/homepage");

      } catch (err) {
        console.log(err);
        setLoginError("Something went wrong. Please try again.");

      } finally {
        setIsLoading(false);
      }
    }

  })

  // resend function 
  const handleResendVerification = async () => {
    if (!formik.values.email) {
      toast.error('Enter your Email first');
      return;
    }
    setResendLoading(true);

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: formik.values.email,
      options: {
emailRedirectTo: `${import.meta.env.VITE_APP_URL}/auth/callback`,      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Verification email sent. Check your inbox.");
      setShowResend(false);
    }

    setResendLoading(false);
  };
  return (
    <div className="loginGen">

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
            className="inputBackground" onChange={(e) => { setLoginError(''); setShowResend(false), formik.handleChange(e) }} value={formik.values.email}
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
              className={`inputBackground ${loginError ? "input-error" : ""
                }`} onChange={(e) => {
                  setLoginError('');
                  setShowResend(false)
                  formik.handleChange(e)
                }} id="password" value={formik.values.password}
            />
            {/* formik vaidation error */}
            {formik.touched.password && formik.errors.password && (
              <p className="error">{formik.errors.password}</p>
            )}

            {/* Supabase login error */}
            {!formik.errors.password && loginError && (
              <p className="error">{loginError}</p>
            )}

            <div className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <div className="btnLogin btn">
          <button className="LogInBtn" type="submit" disabled={isLoading || resendLoading} >  {isLoading ? <FaSpinner className='spinner' /> : "Log in"}
          </button>
          <p className="forgot" onClick={() => navigate('/forgot-password')}>
            Forgot Password?
          </p>
        </div>
        {showResend &&
          <button type='button' className='resend-btn' onClick={handleResendVerification} disabled={resendLoading}>
            {resendLoading ? 'Sending...' : 'Resend verification Email'}
          </button>
        }
        <button type="button" className="CreateAcc signup" onClick={() => navigate('/signup')}>Create Account</button>
      </form>
    </div>
  );
};

export default Login;
