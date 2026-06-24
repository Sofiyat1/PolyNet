import { useContext } from "react";
import { SignUpContext } from "./context/context";

import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import '/src/index.css';
import * as Yup from 'yup';
const MobileNumber = () => {
    const navigate = useNavigate();
    const { signupData, setSignupData } = useContext(SignUpContext)
    const formik = useFormik({
        initialValues: {
            mobilenumber: ''
        },
        validationSchema: Yup.object({
            mobilenumber: Yup.string()
                .required("Enter your mobile number")
                .matches(
                    /^(0?[7-9][0-1][0-9]{8})$/,
                    "Enter a valid Nigerian phone number"
                )
        })
        ,
        onSubmit: values => {
            setSignupData({
                ...signupData,
                mobilenumber: values.mobilenumber
            })
            navigate("/signup/email");
        }
    })
    return (
        <div className="mobile-page">
            <h1>What's your mobile number?</h1>
            <p>Enter the mobile number where you can be contacted. No one will see this on your profile.</p>
            <form onSubmit={formik.handleSubmit} className="mobile-form">
                <div className="phone-wrapper">
                    <span className="country-code">+234</span>
                    <input
                        type="tel"
                        name="mobilenumber"
                        placeholder="8012345678"
                        value={formik.values.mobilenumber}
                        onBlur={formik.handleBlur}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "")
                                .slice(0, 11);
                            formik.setFieldValue("mobilenumber", value);
                        }}
                    />

                </div>
                {formik.touched.mobilenumber &&
                    formik.errors.mobilenumber && (
                        <p className="mobile-error">
                            {formik.errors.mobilenumber}
                        </p>
                    )}

                <button type="submit" className="signup-button">Next</button>
            </form>
        </div>
    )
}

export default MobileNumber;