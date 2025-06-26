import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import UploadVideo from "./Upload";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<{
    username: string;
    email: string;
  } | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/v1/user/profile",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (res.ok) {
          const data = await res.json();
          setProfile(data.user);
        } else {
          setError("Not authorized. Redirecting to home...");
          setTimeout(() => navigate("/"), 2000);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Error occurred. Redirecting to home...");
        setTimeout(() => navigate("/"), 2000);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/v1/user//user/logout",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (res.ok) {
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  if (error) {
    return (
      <div className="unauthorized-message">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="netflix-header">
        <div className="header-content">
          <h1 className="netflix-logo">Strmly</h1>
          <div className="profile-actions">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
            <button
              className="profile-btn"
              onClick={() => setShowProfile(!showProfile)}
            >
              ☰
            </button>
          </div>
        </div>

        {showProfile && profile && (
          <div className="profile-dropdown">
            <p>
              <strong>Username:</strong> {profile.username}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
          </div>
        )}
      </div>

      <div className="welcome-section">
        <h2 className="welcome-heading">
          Welcome to Strmly, {profile?.username || "User"}!
        </h2>
        <p className="subtitle">
          Your personalized streaming dashboard awaits 🎬
        </p>
        <UploadVideo/>
      </div>
    </div>
  );
};

export default Profile;
