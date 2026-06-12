import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import '/src/index.css';

const Name = () => {
    const navigate = useNavigate();
    let formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: ''
        },
        validationSchema: Yup.object({
            firstname: Yup.string().min(4, "First name must be at least 4 characters").required("Enter your firstname"),
            lastname: Yup.string().required("Enter your lastname").min(4, "Last name must be at least 4 characters")
        }),
        onSubmit: value => {
            console.log(value);
            navigate('/signup/gender')
        }
    })

    return (
        <div className="signup-step">
            <h1>What's your name?</h1>
            <p>Enter the name you use in real life.</p>
            <form onSubmit={formik.handleSubmit} className="signup-form">
                <input type="text" placeholder="First name" name="firstname" onChange={formik.handleChange} value={formik.values.firstname} onBlur={formik.handleBlur} className="signup-input"
                />
                {formik.touched.firstname && formik.errors.firstname && (
                    <p className="signup-errors">{formik.errors.firstname}</p>
                )}
                <input type="text" placeholder="Last name" name="lastname" id="" onChange={formik.handleChange} value={formik.values.lastname} className="signup-input" onBlur={formik.handleBlur}
                />
                {formik.touched.lastname && formik.errors.lastname && (
                    <p className="signup-errors"> {formik.errors.lastname}</p>
                )}
                <button type="submit" className="signup-button">Next</button>

            </form>
        </div>
    )
}
export default Name;