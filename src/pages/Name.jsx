import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const Name = () => {
    const navigate = useNavigate();
    let formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: ''
        },
        onSubmit: value => {
            console.log(value);
            navigate('/signup/gender')
        }
    })
    return (
        <div>
            <h1>What's your name?</h1>
            <p>Enter the name you use in real life.</p>
            <form onSubmit={formik.handleSubmit}>
                <input type="text" placeholder="First name" name="firstname" onChange={formik.handleChange} value={formik.values.firstname} />
                <input type="text" placeholder="Last name" name="lastname" id="" onChange={formik.handleChange} value={formik.values.lastname} />
                <button type="submit">Next</button>

            </form>
        </div>
    )
}
export default Name;