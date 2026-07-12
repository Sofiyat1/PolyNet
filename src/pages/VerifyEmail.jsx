import { MdMarkEmailRead } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import '../pages/VerifyEmail.css';
const VerifyEmail = () => {
  const navigate = useNavigate();

  return (
    <div className="verify-email-container">
      <div className="verify-email-card">
        <div className="verify-icon">
          <MdMarkEmailRead />
        </div>

        <h1>Verify your email</h1>

        <p className="verify-text">
          We've sent a verification link to your email address.
          Please check your inbox and click the link to activate your
          PolyNet account.
        </p>

        <p className="spam-text">
          If you don't see it, check your <strong>Spam</strong> or{" "}
          <strong>Promotions</strong> folder.
        </p>

        <button
          className="back-btn"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;