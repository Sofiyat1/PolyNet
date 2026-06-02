import { useNavigate } from "react-router-dom";

const Password = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Create a passsword</h1>
            <p>Create a password with at least 6 letters or numbers. It should be something others can't guess.</p>
            <input type="password" name="" id="" />
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Remember login info. Learn more</label>
            <button onClick={() => navigate("/signup/mobilenumber")}>Next</button>
        </div>
    )
}
export default Password;