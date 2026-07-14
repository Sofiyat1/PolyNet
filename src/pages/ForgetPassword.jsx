
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../index.css"; // only if needed
const ForgetPassword = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Enter a valid email")
                .required("Email is required"),
        }),
        onSubmit: async (values) => {
            setLoading(true);

            const { error } = await supabase.auth.resetPasswordForEmail(
                values.email,
                {
                    redirectTo: `${import.meta.env.VITE_APP_URL}/auth/callback`,
                }
            );

            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Password reset email sent.");
            }

            setLoading(false);
        },
    });
    return (
        <div >
            <h1 className="signup-title">Forgot Password?</h1>

            <p className="signup-description">
                Enter the email associated with your account and we'll send you a password reset link.
            </p>

            <form onSubmit={formik.handleSubmit} className="signup-form">
                <div>
                    <label htmlFor="email">Email</label>

                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="example@gmail.com"
                        className="signup-input"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    {formik.touched.email && formik.errors.email && (
                        <p className="signup-errors">
                            {formik.errors.email}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="signup-button"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
        </div>
    );
}

export default ForgetPassword;