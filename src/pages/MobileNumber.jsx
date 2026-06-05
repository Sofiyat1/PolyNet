import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

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
        <div>
            <h1>What's your mobile number?</h1>
            <p>Enter the mobile number where you can be contacted. No one will see this on your profile.</p>
            <form action="" onSubmit={formik.handleSubmit}>
                <input type="text" name="mobilenumber" id="" placeholder="Mobile number" onChange={formik.handleChange} value={formik.values.mobilenumber} />
                <p>You may receive SMS notifications from us.</p>
                <button type="submit">Next</button>
            </form>
        </div>
    )
}

export default MobileNumber;