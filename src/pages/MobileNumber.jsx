import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import '/src/index.css';
import * as Yup from 'yup';
const MobileNumber = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            mobilenumber: ''
        },
        validationSchema: Yup.object({
            mobilenumber: Yup.string()
                .required("Enter your mobile number")
                .matches(/^[0-9]{10,11}$/, "Enter a valid Nigerian phone number")
        })
        ,
        onSubmit: values => {
            console.log(values);
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
                        type="text"
                        name="mobilenumber"
                        placeholder="8012345678"
                        value={formik.values.mobilenumber}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, "");
                            formik.setFieldValue("mobilenumber", value);
                        }}
                    />
                </div>
                <p className="mobile-note">
                    You may receive SMS notifications from us.
                </p>
                <button type="submit" className="signup-button">Next</button>
            </form>
        </div>
    )
}

export default MobileNumber;