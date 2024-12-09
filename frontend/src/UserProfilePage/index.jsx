import { useParams } from "react-router-dom";
import NavBar from "../NavBar";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const UserProfile = () => {
  const { username } = useParams();
  const [currentSearchUser, setCurrentSearchUser] = useState();

  useEffect(() => {
    const fetchUserByUserName = async (username) => {
      const response = await axios.get(`/api/user/${username}`);
      if (!response) {
        console.log("user not found!!");
      }
      setCurrentSearchUser(response.data);
    };
    fetchUserByUserName(username);
  }, [username]);

  return (
    <div>
      <NavBar />
      <h1>User Profile</h1>
      {currentSearchUser ? (
        <div>
          <div>Username: {currentSearchUser.username}</div>
          <img
            src={currentSearchUser.avatar}
            alt="User Avatar"
            style={{ width: "100px", borderRadius: "50%" }}
          />
          <div>Nickname: {currentSearchUser.nickname}</div>
          <div>
            Registered On:{" "}
            {new Date(currentSearchUser.timeStamp).toLocaleString()}
          </div>
        </div>
      ) : (
        <div>Loading user profile...</div>
      )}
    </div>
  );
};

export default UserProfile;
