import { supabase } from "../lib/supabase";

import { useContext } from "react";
import { SignUpContext } from "./context/context";

import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import '/src/pages/Password.css';
import * as Yup from 'yup';
const Password = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { signupData, setSignupData } = useContext(SignUpContext);

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required("Password is required")
                .min(6, "Password must be at least 6 characters long")
                .matches(/[A-Za-z]/, "Password must contain at least one letter")
                .matches(/[0-9]/, "Password must contain at least one number")
        }),
        onSubmit: async (values) => {
            const finalData = {
                ...signupData,
                password: values.password,
            };

            setSignupData(finalData);

            // console.log(finalData);

            const { data, error } = await supabase.auth.signUp({
                email: finalData.email,
                password: finalData.password,
            });

            if (error) {
                console.log(error.message);
                return;
            }

            const user = data?.user;

            if (!user) {
                console.log("User was not created");
                return;
            }


            const userId = user.id;

            const { error: profileError } =
                await supabase
                    .from("Profiles")
                    .insert({
                        id: userId,
                        firstname: finalData.firstname,
                        lastname: finalData.lastname,
                        gender: finalData.gender,
                        birthday: finalData.birthday,
                        mobilenumber: finalData.mobilenumber,
                    });

            if (profileError) {
                console.log("Profile Error:", profileError.message);
                return;
            }

            console.log("User created:", data);

            navigate("/verify-email");
        }
    })
    return (
        <div className="password-page">
            <h1>Create a password</h1>
            <p>
                Create a password with at least 6 letters or numbers, including a letter and a number.
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
                            value={formik.values.password}
                            className="signup-input"
                            placeholder="Password"
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

                <button type="submit" className="signup-button">Sign Up</button>
            </form>
        </div>
    )
}
export default Password;