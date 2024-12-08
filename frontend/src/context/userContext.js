import React, { createContext, useState, useEffect } from "react";
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
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error("Error checking login status", e);
      }
    };
    checkLoggedIn();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post("/api/users/login", {
        username,
        password,
      });
      if (response.status === 200) {
        setCurrentUser(username);
        setIsLoggedIn(true);
        setError("");
      }
    } catch (e) {
      setError("Login failed");
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
      value={{
        currentUser,
        isLoggedIn,
        setIsLoggedIn,
        setCurrentUser,
        login,
        logout,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
