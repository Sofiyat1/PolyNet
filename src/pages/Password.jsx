import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import '/src/pages/Password.css';
import * as Yup from 'yup';
const Password = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validationSchema: Yup.object({
            password: Yup.string().required('Password is required').min(6, "Password must be at least 6 characters long")
                .matches(/[a-zA-Z]/, "Password must include at least one letter")
                .matches(/[0-9!@#$%^&*]/, "Password must include at least one number or special character")
        }),
        onSubmit: values => {
            console.log(values);
            navigate("/signup/mobilenumber");
        }
    })
    return (
        <div className="password-page">
            <h1>Create a password</h1>

            <p>
                Create a password with at least 6 letters or numbers. It should be something others can't guess.
            </p>

            <form onSubmit={formik.handleSubmit} className="password-form">
                <div className="password-field">
                    <label htmlFor="password">Password</label>

                    <div className="password-input-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.password} className="signup-input"
                        />

                        <span
                            className="eye-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                        <p className="signup-errors">{formik.errors.password}</p>
                    )}
                </div>

                <div className="remember-box">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">
                        Remember login info. <span>Learn more</span>
                    </label>
                </div>

                <button type="submit" className="signup-button">Next</button>
            </form>
        </div>
    )
}
export default Password;