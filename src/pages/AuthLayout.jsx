import { FaArrowLeft } from "react-icons/fa";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const AuthLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // let footer = null;

    const footerMap = {
        "/forgot-password": (
            <p className="find-account" onClick={() => navigate("/login")}>
                Remember your password? <span>Log In</span>
            </p>
        ),
    };

    const footer =
        location.pathname.startsWith("/signup")
            ? <p className="find-account">Find my account</p>
            : footerMap[location.pathname];

    return (
        <div className="signup-layout">
            <FaArrowLeft
                className="back-arrow"
                onClick={() => navigate(-1)}
            />

            <div className="signup-step">
                <Outlet />
            </div>

            {footer}
        </div>
    );
};

export default AuthLayout;