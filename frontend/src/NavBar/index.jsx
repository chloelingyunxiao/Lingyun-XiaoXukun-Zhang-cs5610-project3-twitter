import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const NavBar = ({ isLoggedIn }) => {
  const handleClickNickName = () => {
    console.log("click");
  };

  return (
    <div className="navbar">
      <Link to="/talktown" className="home-link">
        TalkTown
      </Link>
      <div className="auth-links">
        <Link to="/login">Login</Link>
        <Link to="/register">Sign up</Link>
        {isLoggedIn && (
          <button className="logout-button" onClick={handleClickNickName}>
            Log out
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
