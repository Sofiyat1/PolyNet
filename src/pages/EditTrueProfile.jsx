import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
const EditTrueProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        firstname: '',
        lastname: '',
        username: '',
        bio: '',
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

            if (!user) return;

            const { error } = await supabase
                .from("Profiles")
                .update({
                    firstname: profile.firstname,
                    lastname: profile.lastname,
                    username: profile.username,
                    bio: profile.bio,
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
        }
        finally {
            setLoading(false)
        }

    };

    return (
        <div>
            <h1>Edit True Profile</h1>

            <label>First Name</label>
            <input
                type="text"
                name="firstname"
                value={profile.firstname}
                onChange={handleChange}
            />

            <label>Last Name</label>
            <input
                type="text"
                name="lastname"
                value={profile.lastname}
                onChange={handleChange}
            />

            <label>Username</label>
            <input
                type="text"
                name="username"
                value={profile.username || ""}
                onChange={handleChange}

            />

            <label>Bio</label>
            <textarea
                name="bio"
                value={profile.bio || ""}
                onChange={handleChange}

            />

            <button onClick={handleSave} disabled={loading} >{loading ? 'Saving...' : 'Save Changes'}</button>
        </div>
    );
}

export default EditTrueProfile;