import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const RegisterPage = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [errorValue, setErrorValue] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (passwordInput !== confirmPasswordInput) {
      setErrorValue("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/users/register", {
        username: usernameInput,
        password: passwordInput,
      });
      if (response.status === 200) {
        navigate("/talktown");
      }
      console.log("Registration successful");
    } catch (e) {
      setErrorValue(e.response ? e.response.data : "Registration failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Create Your Account</h1>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter your password"
              value={confirmPasswordInput}
              onChange={(e) => setConfirmPasswordInput(e.target.value)}
            />
          </div>
          {errorValue && <p className="error-message">{errorValue}</p>}{" "}
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
