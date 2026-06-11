import { FaArrowLeft } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();

    return (
        <div className="signup-layout">

            {/* Back Button */}
            <FaArrowLeft
                className="back-arrow"
                onClick={() => navigate(-1)}
            />

            {/* 👇 ALL YOUR PAGES RENDER HERE */}
            <div className="signup-step">
                <Outlet />
            </div>

            {/* Footer text */}
            <p className="find-account">Find my account</p>

        </div>
    );
};

export default SignUp;