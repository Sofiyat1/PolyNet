import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { FiCamera } from "react-icons/fi";
import usePosts from "../hooks/usePosts";
import './EditTrueProfile.css';
const EditTrueProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        firstname: '',
        lastname: '',
        username: '',
        bio: '',
    })
    const { getPosts } = usePosts();
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const fileInputRef = useRef(null)
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
        let avatarUrl = profile.avatar_url;
        if (avatar) {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            const fileExt = avatar.name.split(".").pop();

            const fileName = `standard/${user.id}-${Date.now()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from("profile_pictures")
                .upload(fileName, avatar);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from("profile_pictures")
                .getPublicUrl(fileName);

            avatarUrl = data.publicUrl;
        }
        setLoading(true)
        console.log("Saving profile...");

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
                    firstname: profile.firstname.trim(),
                    lastname: profile.lastname.trim(),
                    username: profile.username.trim(),
                    bio: profile.bio.trim(),
                    avatar_url: avatarUrl,
                })
                .eq("id", user.id);

            if (error) {
                console.error(error);
                return;
            }

            alert("Profile updated successfully!");
            // Refresh the posts so the homepage gets the new profile info
            await getPosts();
            navigate("/profilepage", {
                state: {
                    mode: 'standard',
                }
            });
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
                <h1>Edit True Profile</h1>
                <p className="edit-subtitle">
                    Update your public profile information.
                </p>
                <div className="avatar-container">

                    {avatar ? (
                        <img
                            src={URL.createObjectURL(avatar)}
                            alt="Profile"
                            className="profile-avatar"
                        />
                    ) : profile.avatar_url ? (
                        <img
                            src={profile.avatar_url}
                            alt="Profile"
                            className="profile-avatar"
                        />
                    ) : (
                        <div className="profile-avatar avatar-placeholder">
                            {(
                                (profile.firstname?.charAt(0) || "") +
                                (profile.lastname?.charAt(0) || "")
                            ).toUpperCase()}
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
                        type="file"
                        hidden
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={(e) => setAvatar(e.target.files[0])}
                    />

                </div>
                <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input
                        id="firstname"
                        type="text"
                        name="firstname"
                        value={profile.firstname}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        id="lastname"
                        type="text"
                        name="lastname"
                        value={profile.lastname}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="@username"
                        value={profile.username || ""}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        id="bio"
                        name="bio"
                        rows="5"
                        placeholder="Tell people a little about yourself..."
                        value={profile.bio || ""}
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

export default EditTrueProfile;