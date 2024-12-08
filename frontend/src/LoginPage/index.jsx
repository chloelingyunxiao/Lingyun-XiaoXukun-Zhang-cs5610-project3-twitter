import React from "react";
import "./style.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setErrorValue] = useState("");
  const navigate = useNavigate();

  const setUsername = (event) => {
    const username = event.target.value;
    setUsernameInput(username);
  };

  const setPassword = (event) => {
    const pswd = event.target.value;
    setPasswordInput(pswd);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/users/login", {
        username: usernameInput,
        password: passwordInput,
      });
      // console.log("login successful");
      if (response.status === 200) {
        navigate("/talktown");
      }
    } catch (e) {
      setErrorValue(e.response ? e.response.data : "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={usernameInput}
              onChange={setUsername}
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={passwordInput}
              onChange={setPassword}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
