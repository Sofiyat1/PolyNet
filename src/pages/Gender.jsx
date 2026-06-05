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
            navigate('/signup/birthday')
        }
    })
    return (
        <div>
            <h1>What's your gender?</h1>
            <p>You can change who sees your gender on your profile later.</p>
            <form onSubmit={formik.handleSubmit}>
                <div className="">
                    <label htmlFor="gender" >Female</label>
                    <input type="radio" name="gender" id="" value='Female' onChange={formik.handleChange} />
                </div>
                <div className="">
                    <label htmlFor="">Male</label>
                    <input type="radio" name="gender" id="" value='Male' />
                </div>
                <div className="">
                    <label htmlFor="">More options</label>
                    <p>Select More options to chose another gender or if you'd rather not say.</p>
                    <input type="radio" name="gender" id="" value='More options' />
                </div>
                <button type="submit">Next</button>
            </form>
        </div>
    )
}

export default Gender;