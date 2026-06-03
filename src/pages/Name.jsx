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

        }
    })
    return (
        <div>
            <h1>What's your name?</h1>
            <p>Enter the name you use in real life.</p>
            <form onSubmit={formik.handleSubmit}>
                <input type="text" placeholder="First name" name="firstname" onChange={formik.handleChange} />
                <input type="text" placeholder="Last name" name="lastname" id="" onChange={formik.handleChange} />
                <button type="submit" onClick={() => navigate('/signup/gender')}>Next</button>

            </form>
        </div>
    )
}
export default Name;