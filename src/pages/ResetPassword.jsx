import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../index.css";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Za-z]/, "Password must contain a letter")
        .matches(/[0-9]/, "Password must contain a number"),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm your password"),
    }),

    onSubmit: async (values) => {
      setLoading(true);

      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Password updated successfully.");

        await supabase.auth.signOut();

        navigate("/login");
      }

      setLoading(false);
    },
  });

  return (
    <div>
      <h1 className="signup-title">Create New Password</h1>

      <p className="signup-description">
        Enter a new password for your account.
      </p>

      <form onSubmit={formik.handleSubmit} className="signup-form">

        <div>
          <label>New Password</label>

          <input
            type="password"
            name="password"
            className="signup-input"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.password && formik.errors.password && (
            <p className="signup-errors">
              {formik.errors.password}
            </p>
          )}
        </div>

        <div>
          <label>Confirm Password</label>

          <input
            type="password"
            name="confirmPassword"
            className="signup-input"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.confirmPassword &&
            formik.errors.confirmPassword && (
              <p className="signup-errors">
                {formik.errors.confirmPassword}
              </p>
            )}
        </div>

        <button
          className="signup-button"
          disabled={loading}
          type="submit"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

      </form>
    </div>
  );
};

export default ResetPassword;