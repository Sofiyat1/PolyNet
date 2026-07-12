import { useContext } from "react";
import { SignUpContext } from "./context/context";

import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "/src/index.css";

const Email = () => {
  const navigate = useNavigate();
  const { signupData, setSignupData } = useContext(SignUpContext);

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email address")
        .required("Enter your email address"),
    }),

    onSubmit: (values) => {
      setSignupData({
        ...signupData,
        email: values.email
      })
      // Save email to context/localStorage here later

      navigate("/signup/password");
    },
  });

  return (
    <div className="signup-step">
      <h1>What's your email?</h1>

      <p>
        Enter the email address where you can be contacted.
        No one will see this on your profile.
      </p>

      <form onSubmit={formik.handleSubmit} className="signup-form">
        <input
          type="email"
          name="email"
          placeholder="Email address"
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

        <button type="submit" className="signup-button">
          Next
        </button>
      </form>
    </div>
  );
};

export default Email;