// src/Signin.tsx
import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
const Signin: React.FC = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const Navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:3000/api/v1/user/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // ✅ Important: this enables receiving cookies
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      console.log("Response data:", data);
      if (res.ok) {
        setMessage("Signin successful!");
        Navigate("/Profile");
        
      } else {
        setMessage(data.message || "Signin failed!");
      }
    } catch (err) {
      throw new Error(`Network response was not ok ${err}`);
      setMessage("Something went wrong!");
    }
  };

  return (
    <div className="page-container">
      <h1 className="glossy-heading">Sign In to Strmly</h1>
      <form className="netflix-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="glossy-button">
          Sign In
        </button>
        {message && <p className="response-message">{message}</p>}
      </form>
    </div>
  );
};

export default Signin;
