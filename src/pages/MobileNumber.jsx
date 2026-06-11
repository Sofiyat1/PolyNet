import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import '/src/index.css';
const MobileNumber = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            mobilenumber: ''
        },
        onSubmit: values => {
            console.log(values);
        }
    })
    return (
        <div className="mobile-page">
            <h1>What's your mobile number?</h1>

            <p>
                Enter the mobile number where you can be contacted. No one will see this on your profile.
            </p>

            <form onSubmit={formik.handleSubmit} className="mobile-form">
                <input
                    type="text"
                    name="mobilenumber"
                    placeholder="Mobile number"
                    onChange={formik.handleChange}
                    value={formik.values.mobilenumber} className="signup-input"
                />

                <p className="mobile-note">
                    You may receive SMS notifications from us.
                </p>

                <button type="submit" className="signup-button">Next</button>
            </form>
        </div>
    )
}

export default MobileNumber;