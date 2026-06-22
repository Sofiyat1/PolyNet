import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import '/src/index.css';
import * as Yup from 'yup';
const Birthday = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            birthday: ""
        },
        validationSchema: Yup.object({
            birthday: Yup.string().required('Select your birth date')
        }),
        onSubmit: values => {
            console.log(values);
            navigate("/signup/password")
        }
    })

    const calculateAge = (dob) => {
        if (!dob) return "";

        const birthDate = new Date(dob);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();

        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        // adjust if birthday hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
        return age;
    };

    // 2. derive age from formik value
    const age = calculateAge(formik.values.birthday);
    return (
        <div className="signup-step">
            <h1>What's your birthday?</h1>
            <p>Choose your date of birth. You can always make this private later. <span>Why do I need to provide my birthday?</span></p>
            <form onSubmit={formik.handleSubmit} className="signup-form">
                <div className="birthday-field">
                    <label htmlFor="birthday">  Birthday {age ? `(${age} years old)` : ""}
                    </label>

                    <input
                        type="date"
                        id="birthday"
                        name="birthday"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.birthday}
                        className="signup-input"
                    />
                </div>
                {formik.touched.birthday && formik.errors.birthday && (
                    <p className="signup-errors">{formik.errors.birthday}</p>
                )}
                <button type="submit" className="signup-button">Next</button>
            </form>
        </div>
    )
}
export default Birthday;