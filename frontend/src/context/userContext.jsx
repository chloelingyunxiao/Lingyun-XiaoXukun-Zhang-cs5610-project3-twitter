import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get("/api/users/isLoggedIn");
        if (response.data.username) {
          setCurrentUser(response.data.username);
        }
      } catch (e) {
        console.error("Error checking login status", e);
      }
    };
    checkLoggedIn();
  }, []);

  // return a boolean indicating whether the user is logged in
  const login = async (username, password) => {
    try {
      const response = await axios.post("/api/users/login", {
        username,
        password,
      });
      if (response.status === 200) {
        setCurrentUser(username);
        setError("");
        console.log("Login successful", response.data);
        setIsLoggedIn(true);

        return true;
      }
    } catch (e) {
      setError("Login failed");
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/users/logOut");
      setCurrentUser(null);
      setIsLoggedIn(false);
    } catch (e) {
      console.error("Error during logout", e);
    }
  };

  return (
    <UserContext.Provider
      value={{ currentUser, login, logout, error, isLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };