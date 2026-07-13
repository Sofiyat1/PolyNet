import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        async function finishVerification() {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (session) {
                await supabase.auth.signOut();

                toast.success("Email verified successfully. Please log in.");

                navigate("/login");
            } else {
                navigate("/login");
            }
        }

        finishVerification();
    }, []);

    return <p>Verifying your account...</p>;
}

export default AuthCallback;