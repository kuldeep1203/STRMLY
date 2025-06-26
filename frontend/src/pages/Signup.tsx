// src/Signup.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; 

const Signup: React.FC = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:3000/api/v1/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      console.log("Response data:", data);
      if (res.ok) {
        setMessage("Signup successful!");
        navigate("/Signin");
      } else {
        setMessage(data.message || "Signup failed!");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setMessage("Something went wrong!");
    }
  };

  return (
    <div className="page-container">
      <h1 className="glossy-heading">Create Your Strmly Account</h1>
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
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
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
          Sign Up
        </button>
        {message && <p className="response-message">{message}</p>}
      </form>
    </div>
  );
};

export default Signup;
