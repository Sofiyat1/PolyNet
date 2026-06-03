import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const Birthday = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            birthday: ""
        },
        onSubmit: values=>{
            console.log(values);
            
        }
    })
    return (
        <div>
            <h1>What's your birthday?</h1>
            <p>Choose your date of birth. You can always make this private later. <span>Why do I need to provide my birthday?</span></p>
            <form action="" onSubmit={formik.handleSubmit}>
                <div className="">
                    <label htmlFor="">Birthday (13 years old)</label>
                    <input type="date" name="birthday" id="" />
                </div>
                <button type="submit" onClick={() => navigate("/signup/password")}>Next</button>
            </form>
        </div>
    )
}
export default Birthday;