import { FaArrowLeft } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
const SignUp = () => {
    const navigate = useNavigate();
    return (
        <div>
            <FaArrowLeft onClick={() => navigate(-1)} />
            <Outlet />
            <p>Find my account</p>
        </div>
    )
}

export default SignUp;