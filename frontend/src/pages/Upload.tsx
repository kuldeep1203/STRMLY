import React, { useState } from "react";
import "../App.css";
const UploadVideo: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    } else {
      setUploadStatus("Please select a valid video file.");
      setVideoFile(null);
    }
  };

  const handleUpload = async () => {
    if (!videoFile) {
      setUploadStatus("Please select a video to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const res = await fetch(
        "http://localhost:3000/api/v1/user/upload",
        {
          method: "POST",
          credentials: "include", // ✅ sends cookies (auth)
          body: formData,
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log("Upload success:", data);
        setUploadStatus("✅ Video uploaded successfully!");
      } else {
        const errData = await res.json();
        setUploadStatus(`❌ Upload failed: ${errData.message}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("❌ An error occurred during upload.");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload a Video</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload} className="upload-button">
        Upload
      </button>
      {uploadStatus && <p className="status-message">{uploadStatus}</p>}
    </div>
  );
};

export default UploadVideo;
