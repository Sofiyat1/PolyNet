import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import './EditTrueProfile.css';
const EditDecoyProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        decoy_name: '',
        decoy_username: '',
        decoy_bio: '',
    })
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getProfile();
    }, [])
    async function getProfile() {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        const { data, error } = await supabase
            .from("Profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        if (error) {
            console.error(error);
            return;
        }

        setProfile(data);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        setLoading(true)
        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                alert("You need to log in again.");
                return
            };

            const { error } = await supabase
                .from("Profiles")
                .update({
                    decoy_name: profile.decoy_name.trim(),
                    decoy_username: profile.decoy_username.trim(),
                    decoy_bio: profile.decoy_bio.trim(),
                })
                .eq("id", user.id);

            if (error) {
                console.error(error);
                return;
            }

            alert("Profile updated successfully!");

            navigate("/profilepage");
        } catch (err) {
            console.log(err);
            alert("Something went wrong. Please try again.");
        }
        finally {
            setLoading(false)
        }

    };

    
    return (
        <div className="edit-profile-page">
            <div className="edit-profile-card">
                <h1>Edit Decoy Profile</h1>
                <p className="edit-subtitle">
                    Update your decoy profile information.
                </p>

                <div className="form-group">
                    <label htmlFor="decoy_name">Decoy Name</label>
                    <input
                        id="decoy_name"
                        type="text"
                        name="decoy_name"
                        value={profile.decoy_name}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="decoy_username">Decoy username</label>
                    <input
                        id="decoy_username"
                        type="text"
                        name="decoy_username"
                        placeholder="@decoy_username"
                        value={profile.decoy_username || ""}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="decoy_bio">Decoy bio</label>
                    <textarea
                        id="decoy_bio"
                        name="decoy_bio"
                        rows="5"
                        placeholder="Tell people a little about yourself..."
                        value={profile.decoy_bio || ""}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>

                <button
                    className="save-btn"
                    onClick={handleSave}
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    );
}

export default EditDecoyProfile;