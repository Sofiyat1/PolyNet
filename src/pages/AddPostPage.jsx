import { useRef, useState, useEffect } from "react";
import { FiImage, FiVideo, FiX, FiLock, FiGlobe } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./AddPostPage.css";
import usePosts from "../hooks/usePosts";
function AddPostPage() {
  const navigate = useNavigate();
  const [postText, setPostText] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const { getPosts } = usePosts();
  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("Profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(data);
  }
  const [showIdentityModal, setShowIdentityModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [pendingIdentity, setPendingIdentity] = useState("");


  const fileInputRef = useRef(null);

  /* MEDIA SELECT */
  const handleMediaSelect = (e) => {

    const files = Array.from(e.target.files);

    const mappedFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type,
    }));

    setMediaFiles((prev) => [...prev, ...mappedFiles]);
  };

  /* REMOVE MEDIA */
  const removeMedia = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  /* OPEN MODAL 1 */
  const openIdentityModal = () => {
    if (!postText.trim() && mediaFiles.length === 0) {
      alert("Your post is empty.");
      return;
    }

    setShowIdentityModal(true);
  };

  /* FINAL SUBMIT */

  const handleFinalSubmit = async () => {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login again");
        return;
      }

      // ==========================
      // Upload media to Storage
      // ==========================
      let mediaUrl = null;
      let mediaType = null;

      if (mediaFiles.length > 0) {
        const file = mediaFiles[0].file;

        const fileName = `${Date.now()}-${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("post_media")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("post-media")
          .getPublicUrl(fileName);

        mediaUrl = data.publicUrl;
        mediaType = file.type;
      }

      // ==========================
      // Save post to database
      // ==========================
      const { error } = await supabase
        .from("Posts")
        .insert({
          user_id: user.id,
          content: postText,
          identity: pendingIdentity,
          media_url: mediaUrl,
          media_type: mediaType,
        });

      if (error) throw error;

      await getPosts();

      setPostText("");
      setMediaFiles([]);
      setPendingIdentity("");
      setShowConfirmModal(false);
      setShowIdentityModal(false);

      navigate("/homepage");

    } catch (error) {
      console.error(error);
      alert("Couldn't publish post.");
    } finally {
      setLoading(false);
    }
  };
  if (!profile) {
    return (
      <div className="add-post-page">
        <p>Loading...</p>
      </div>
    );
  }


  return (
    <div className="add-post-page">
      {/* HEADER */}
      <div className="add-post-header">
        <h2>Create Post</h2>
      </div>

      {/* USER CARD */}
      <div className="post-user-card">
        <div className="avatar">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="Profile" />
          ) : (
            <span>
              {(
                (profile?.firstname?.charAt(0) || "") +
                (profile?.lastname?.charAt(0) || "")
              ).toUpperCase()}
            </span>
          )}
        </div>

        <div className="user-info">
          <p className="username">
            {profile?.firstname} {profile?.lastname}
          </p>

          <span className="identity-warning">
            Identity will be chosen before publishing
          </span>
        </div>
      </div>

      {/* TEXTAREA */}
      <textarea
        className="post-textarea"
        placeholder="What's on your mind?"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
      />

      {/* MEDIA PREVIEW */}
      {mediaFiles.length > 0 && (
        <div className="media-preview-grid">
          {mediaFiles.map((media, index) => (
            <div className="media-card" key={index}>
              <button
                className="remove-media"
                onClick={() => removeMedia(index)}
              >
                <FiX />
              </button>

              {media.type.startsWith("image") ? (
                <img src={media.preview} alt="preview" />
              ) : (
                <video src={media.preview} controls />
              )}
            </div>
          ))}
        </div>
      )}

      {/* MEDIA BUTTONS */}
      <div className="media-actions">
        <button onClick={() => fileInputRef.current.click()}>
          <FiImage />
          Add Photo
        </button>

        <button onClick={() => fileInputRef.current.click()}>
          <FiVideo />
          Add Video
        </button>

        <input
          type="file"
          multiple
          hidden
          ref={fileInputRef}
          accept="image/*,video/*"
          onChange={handleMediaSelect}
        />
      </div>

      {/* PUBLISH BUTTON */}
      <button className="publish-btn" onClick={openIdentityModal}>
        Publish Post
      </button>

      {/* MODAL 1: IDENTITY */}
      {showIdentityModal && (
        <div
          className="modal-overlay"
          onClick={() => {
            setShowIdentityModal(false);
            setPendingIdentity("");
          }}
        >
          <div className="identity-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Choose Posting Identity</h3>

            <small>
              This determines who can see this post.
            </small>

            <div className="identity-choice-group">
              <button
                className="identity-choice decoy"
                onClick={() => {
                  setPendingIdentity("decoy");
                  setShowIdentityModal(false);
                  setShowConfirmModal(true);
                }}
              >
                <span className="choice-icon">
                  <FiLock />
                </span>

                <span className="choice-text">Post as Decoy</span>
              </button>

              <button
                className="identity-choice standard"
                onClick={() => {
                  setPendingIdentity("standard");
                  setShowIdentityModal(false);
                  setShowConfirmModal(true);
                }}
              >
                <span className="choice-icon">
                  <FiGlobe />
                </span>

                <span className="choice-text">Post as Standard</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CONFIRMATION */}
      {showConfirmModal && (
        <div
          className="modal-overlay"
          onClick={() => {
            setShowConfirmModal(false);
            setPendingIdentity("");
          }}
        >
          <div className="identity-modal" onClick={(e) => e.stopPropagation()}>
            <p className="confirm-text">
              Confirm that you're posting as{" "}
              <span className={`identity-highlight ${pendingIdentity}`}>
                {pendingIdentity.toUpperCase()}
              </span>
            </p>

            <small>
              This action determines which connections can view this post.
            </small>

            <button className="final-confirm-btn" onClick={handleFinalSubmit}>
              Confirm & Publish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddPostPage;
