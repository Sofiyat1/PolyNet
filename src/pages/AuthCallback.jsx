import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const hash = window.location.hash;

        // Password recovery
        if (hash.includes("type=recovery")) {
          navigate("/reset-password");
          return;
        }

        // Give Supabase time to establish the session
        await new Promise((resolve) => setTimeout(resolve, 500));

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error(sessionError);
          toast.error("Unable to verify your account.");
          navigate("/login");
          return;
        }

        if (!session) {
          toast.error("Verification session not found.");
          navigate("/login");
          return;
        }

        const user = session.user;

        // Check whether the profile already exists
        const {
          data: existingProfile,
          error: profileError,
        } = await supabase
          .from("Profiles")
          .select("id")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) {
          console.error(profileError);
          toast.error("Unable to verify your account.");
          navigate("/login");
          return;
        }

        // Create profile only if it doesn't exist
        if (!existingProfile) {
          const {
            data: pendingProfile,
            error: pendingError,
          } = await supabase
            .from("pending_profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (pendingError || !pendingProfile) {
            console.error(pendingError);
            toast.error("Pending profile not found.");
            navigate("/login");
            return;
          }

          // Insert into Profiles
          const { error: insertError } = await supabase
            .from("Profiles")
            .insert({
              id: pendingProfile.id,
              firstname: pendingProfile.firstname,
              lastname: pendingProfile.lastname,
              gender: pendingProfile.gender,
              birthday: pendingProfile.birthday,
              mobilenumber: pendingProfile.mobilenumber,
            });

          if (insertError) {
            console.error(insertError);
            toast.error(insertError.message);
            return;
          }

          // Delete temporary profile
          const { error: deleteError } = await supabase
            .from("pending_profiles")
            .delete()
            .eq("id", user.id);

          if (deleteError) {
            console.error(deleteError);
          }
        }

        toast.success("Email verified successfully. Please log in.");

        await supabase.auth.signOut();

        navigate("/login");
      } catch (error) {
        console.error("Auth callback error:", error);
        toast.error("Something went wrong during verification.");
        navigate("/login");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return <p>Please wait...</p>;
}

export default AuthCallback;