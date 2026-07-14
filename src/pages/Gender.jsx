import { useContext } from "react";
import { SignUpContext } from "./context/context";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import '/src/pages/Gender.css';
const Gender = () => {
    const navigate = useNavigate();
    const { signupData, setSignupData } = useContext(SignUpContext);

    const formik = useFormik({
        initialValues: {
            gender: ""
        },
        validationSchema: Yup.object({
            gender: Yup.string().required("Please select your gender")
        }),
        onSubmit: values => {
            setSignupData({
                ...signupData,
                gender: values.gender,
            });
            navigate('/signup/birthday')
        }
    })
    return (
        <div className="gender-page">
            <h1>What's your gender?</h1>
            <p>You can change who sees your gender on your profile later.</p>

            <form onSubmit={formik.handleSubmit} className="gender-form">
                <div className="gender-option">
                    <label htmlFor="female">Female</label>
                    <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="Female"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} className="signup-input"
                    />
                </div>

                <div className="gender-option">
                    <label htmlFor="male">Male</label>
                    <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="Male" onBlur={formik.handleBlur}
                        onChange={formik.handleChange} className="signup-input"
                    />
                </div>

                <div className="gender-option">
                    <div>
                        <label htmlFor="more-options">More options</label>
                        <p className="gender-note">
                            Select More options to choose another gender or if you'd rather not say.
                        </p>
                    </div>

                    <input
                        type="radio"
                        id="more-options"
                        name="gender"
                        value="More options"
                        onChange={formik.handleChange}
                    />
                </div>

                {formik.touched.gender && formik.errors.gender && (
                    <p className="signup-errors">{formik.errors.gender}</p>
                )}

                <button type="submit" className="signup-button">Next</button>
            </form>
        </div>
    )
}

export default Gender;