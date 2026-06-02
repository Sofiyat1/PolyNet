import { FaArrowLeft } from "react-icons/fa";
import { Outlet } from "react-router-dom";
const SignUp = () => {
    return (
        <div>
            <FaArrowLeft/>
            <Outlet/>
            <p>Find my account</p>
        </div>
    )
}

export default SignUp;