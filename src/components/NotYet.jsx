import { FiTool } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./NotYet.css";

function NotYet() {
  const navigate = useNavigate();

  return (
    <div className="notyet-page">
      <FiTool className="notyet-icon" />

      <h2>Feature Under Development</h2>

      <button onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
}

export default NotYet;