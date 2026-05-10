import { useRef, useState } from "react";
import {
  FiImage,
  FiVideo,
  FiX,
  FiLock,
  FiGlobe,
} from "react-icons/fi";
import "./AddPostPage.css";

function AddPostPage() {
  const [postText, setPostText] = useState("");
  const [selectedIdentity, setSelectedIdentity] = useState("standard");
  const [mediaFiles, setMediaFiles] = useState([]);

  const fileInputRef = useRef(null);

  const handleMediaSelect = (e) => {
    const files = Array.from(e.target.files);

    const mappedFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type,
    }));

    setMediaFiles((prev) => [...prev, ...mappedFiles]);
  };

  const removeMedia = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    console.log({
      text: postText,
      identity: selectedIdentity,
      media: mediaFiles,
    });

    alert("Post submitted successfully");
  };

  return (
    <div className="add-post-page">
      {/* HEADER */}
      <div className="add-post-header">
        <h2>Create Post</h2>
      </div>

      {/* USER BLOCK */}
      <div className="post-user-card">
        <div className="avatar" />

        <div className="user-info">
          <p className="username">John Doe</p>

          <div className="identity-preview">
            {selectedIdentity === "standard" ? (
              <>
                <FiGlobe className="identity-icon standard" />
                <span>Posting as Standard</span>
              </>
            ) : (
              <>
                <FiLock className="identity-icon decoy" />
                <span>Posting as Decoy</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* TEXT INPUT */}
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

      {/* MEDIA ACTIONS */}
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

      {/* IDENTITY SECTION */}
      <div className="identity-section">
        <p className="identity-title">Post As</p>

        <div className="identity-toggle-group">
          <button
            className={`identity-btn decoy ${
              selectedIdentity === "decoy" ? "active" : ""
            }`}
            onClick={() => setSelectedIdentity("decoy")}
          >
            <FiLock />
            Decoy
          </button>

          <button
            className={`identity-btn standard ${
              selectedIdentity === "standard" ? "active" : ""
            }`}
            onClick={() => setSelectedIdentity("standard")}
          >
            <FiGlobe />
            Standard
          </button>
        </div>

        <div className="visibility-card">
          {selectedIdentity === "standard" ? (
            <p>
              This post will only be visible to your standard connections.
            </p>
          ) : (
            <p>
              This post will only be visible to your decoy connections.
            </p>
          )}
        </div>
      </div>

      {/* SUBMIT */}
      <button className="publish-btn" onClick={handleSubmit}>
        Publish Post
      </button>
    </div>
  );
}

export default AddPostPage;
