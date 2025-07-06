import React, { useState ,useRef} from "react";
import "../App.css";
const UploadVideo: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  

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
        setUploadStatus("Video uploaded successfully!");
      } else {
        const errData = await res.json();
        setUploadStatus(` Upload failed: ${errData.message}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("An error occurred during upload.");
    }
  };

  const handleOpenDialog = ()=>{
    dialogRef.current?.showModal();
  }
  const handleCloseDialog = ()=>{
    dialogRef.current?.close();
    setUploadStatus("");
    setVideoFile(null);
  }

  return (
    <div>
      <div></div>
      <button className="logout-btn " onClick={handleOpenDialog}>Upload a Video</button>

      <dialog className="dialog-box"ref = {dialogRef}>
        <h2 className="dialog-title">Upload your Video</h2>
        <button  className ="btn-in"onClick={()=>inputRef.current?.click()}>Browse Files</button>
        <input  ref={inputRef} type="file"  accept = "video/*" style={{display:'none'}} onChange={handleFileChange}/>
        <button className="btn-in" onClick={handleUpload}>Upload</button>
        <button className="btn-in"onClick={handleCloseDialog}>Close</button>
        {uploadStatus && <p>{uploadStatus}</p>}
      </dialog>
    </div>
  );
};

export default UploadVideo;
