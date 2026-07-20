import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { FiCamera } from "react-icons/fi";
import toast from 'react-hot-toast';
import './EditTrueProfile.css';
const EditDecoyProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        decoy_name: '',
        decoy_username: '',
        decoy_bio: '',
    })
    const [avatar, setAvatar] = useState(null)
    const fileInputRef = useRef(null)
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
        if (loading) return;
        setLoading(true);

        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                toast.error("You need to log in again.");
                return;
            }

            let avatarUrl = profile.decoy_avatar_url;

            if (avatar) {
                const fileExt = avatar.name.split(".").pop();

                const fileName = `decoy/${user.id}-${Date.now()}.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                    .from("profile_pictures")
                    .upload(fileName, avatar);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from("profile_pictures")
                    .getPublicUrl(fileName);

                avatarUrl = data.publicUrl;
            }

            const { error } = await supabase
                .from("Profiles")
                .update({
                    decoy_name: profile.decoy_name?.trim() || "",
                    decoy_username: profile.decoy_username?.trim() || "",
                    decoy_bio: profile.decoy_bio?.trim() || "",
                    decoy_avatar_url: avatarUrl,
                })
                .eq("id", user.id);

            if (error) throw error;

            toast.success("Profile updated successfully!");

            navigate("/profilepage", {
                state: {
                    mode: "decoy",
                },
            });
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="edit-profile-page">
            <div className="edit-profile-card">
                <h1>Edit Decoy Profile</h1>
                <p className="edit-subtitle">
                    Update your decoy profile information.
                </p>
                <div className="avatar-container">

                    {avatar ? (
                        <img
                            src={URL.createObjectURL(avatar)}
                            className="profile-avatar"
                            alt="Decoy"
                        />
                    ) : profile.decoy_avatar_url ? (
                        <img
                            src={profile.decoy_avatar_url}
                            className="profile-avatar"
                            alt="Decoy"
                        />
                    ) : (
                        <div className="profile-avatar avatar-placeholder">
                            {(profile.decoy_name?.charAt(0) || "A").toUpperCase()}
                        </div>
                    )}

                    <button
                        type="button"
                        className="avatar-edit-btn"
                        onClick={() => fileInputRef.current.click()}
                    >
                        <FiCamera />
                    </button>

                    <input
                        hidden
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={(e) => setAvatar(e.target.files[0])}
                    />

                </div>
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