import { FiLock, FiGlobe, FiXCircle } from "react-icons/fi";
import "./RequestCard.css";

const RequestCard = ({ request, onAccept, onReject }) => {
    return (
        <div className="request-card">
            <div className="row">
                <div className="avatar">
                    {request.avatar ? (
                        <img
                            src={request.avatar}
                            alt={request.name}
                            className="avatar-image"
                        />
                    ) : (
                        <div className="avatar-placeholder">
                            {request.name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                <div className="text-block">
                    <p className="name">{request.name}</p>

                    {request.username && (
                        <p className="username">@{request.username}</p>
                    )}

                    <p className="msg">
                        Wants to connect with you.
                    </p>
                </div>
            </div>

            <div className="btn-group">

                <button
                    className="btn-decoy"
                    onClick={() => onAccept(request, "decoy")}
                >
                    <FiLock />
                    Decoy
                </button>

                <button
                    className="btn-standard"
                    onClick={() => onAccept(request, "standard")}
                >
                    <FiGlobe />
                    Standard
                </button>

                <button
                    className="reject"
                    onClick={() => onReject(request.id)}
                >
                    <FiXCircle />
                    Reject
                </button>

            </div>
        </div>
    );
};

export default RequestCard;