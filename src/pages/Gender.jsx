import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const Gender = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            gender: ""
        },
        onSubmit: values => {
            console.log(values);
        }
    })
    return (
        <div>
            <h1>What's your gender?</h1>
            <p>You can change who sees your gender on your profile later.</p>
            <form onSubmit={formik.handleSubmit}>
                <div className="">
                    <label htmlFor="">Female</label>
                    <input type="radio" name="gender" id="" />
                </div>
                <div className="">
                    <label htmlFor="">Male</label>
                    <input type="radio" name="gender" id="" />
                </div>
                <div className="">
                    <label htmlFor="">More options</label>
                    <p>Select More options to chose another gender or if you'd rather not say.</p>
                    <input type="radio" name="gender" id="" />
                </div>
                <button type="submit" onClick={() => navigate('/signup/birthday')}>Next</button>
            </form>
        </div>
    )
}

export default Gender;