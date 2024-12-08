import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { logout, isLoggedIn, currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    console.log("logout");
    navigate("/talktown");
  };

  return (
    <div className="navbar">
      <Link to="/talktown" className="home-link">
        TalkTown
      </Link>
      <div className="auth-links">
        {isLoggedIn ? (
          <>
            <span className="username">{currentUser.username}</span>
            <img src={currentUser.avatar} alt="avatar" className="avatar" />
            <button className="logout-button" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
