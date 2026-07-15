import { supabase } from "../lib/supabase";
import { useContext, useState } from "react";
import { SignUpContext } from "./context/context";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import * as Yup from "yup";
import "./Password.css";

const Password = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { signupData, setSignupData } = useContext(SignUpContext);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            password: "",
        },

        validationSchema: Yup.object({
            password: Yup.string()
                .required("Password is required")
                .min(6, "Password must be at least 6 characters long")
                .matches(/[A-Za-z]/, "Password must contain at least one letter")
                .matches(/[0-9]/, "Password must contain at least one number"),
        }),

        onSubmit: async (values) => {
            if (loading) return;

            setLoading(true);

            try {
                // Ensure previous signup steps are completed
                if (!signupData?.email) {
                    toast.error("Please complete the signup process first.");
                    navigate("/signup");
                    return;
                }

                const finalData = {
                    ...signupData,
                    password: values.password,
                };

                setSignupData(finalData);

                const { data, error } = await supabase.auth.signUp({
                    email: finalData.email,
                    password: finalData.password,
                    options: {
                        emailRedirectTo: `${import.meta.env.VITE_APP_URL}/auth/callback`,
                        data: {
                            firstname: finalData.firstname,
                            lastname: finalData.lastname,
                            gender: finalData.gender,
                            birthday: finalData.birthday,
                            mobilenumber: finalData.mobilenumber,
                        },
                    },
                });

                console.log("Signup response:", data);

                if (error) {
                    toast.error(error.message);
                    return;
                }

                // Prevent duplicate accounts
                if (!data.user || data.user.identities?.length === 0) {
                    toast.error(
                        "An account with this email already exists. Please log in instead."
                    );
                    return;
                }

                // Save temporary profile
                const { error: pendingError } = await supabase
                    .from("pending_profiles")
                    .insert({
                        id: data.user.id,
                        firstname: finalData.firstname,
                        lastname: finalData.lastname,
                        gender: finalData.gender,
                        birthday: finalData.birthday,
                        mobilenumber: finalData.mobilenumber,
                    });

                if (pendingError) {
                    console.error(pendingError);
                    toast.error("Unable to save signup details.");
                    return;
                }

                toast.success(
                    "Account created successfully. Please check your email to verify your account."
                );

                navigate("/verify-email");

            } catch (err) {
                console.error("Signup Error:", err);
                toast.error("Something went wrong. Please try again.");
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className="password-page">
            <h1>Create a password</h1>

            <p>
                Create a password with at least 6 characters, including a letter and a
                number.
            </p>

            <form onSubmit={formik.handleSubmit} className="password-form">
                <div className="password-field">
                    <label htmlFor="password">Password</label>

                    <div className="password-input-wrapper">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="signup-input"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
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

                <button
                    type="submit"
                    className="signup-button"
                    disabled={loading}
                >
                    {loading ? "Creating account..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
};

export default Password;