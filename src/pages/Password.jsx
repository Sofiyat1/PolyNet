import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const Password = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            password: ''
        },
        onSubmit: values => {
            console.log(values);
            navigate("/signup/mobilenumber");
        }
    })
    return (
        <div>
            <h1>Create a passsword</h1>
            <p>Create a password with at least 6 letters or numbers. It should be something others can't guess.</p>
            <form action="" onSubmit={formik.handleSubmit}>
                <div className="">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" id="" onChange={formik.handleChange} value={formik.values.password} />
                </div>
                <input type="checkbox" name="" id="" />
                <label htmlFor="">Remember login info. Learn more</label>
                <button type="submit">Next</button>
            </form>
        </div>
    )
}
export default Password;