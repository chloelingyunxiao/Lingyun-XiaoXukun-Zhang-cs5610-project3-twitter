import { useParams } from "react-router-dom";
import NavBar from "../NavBar";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const UserProfile = () => {
  const { username } = useParams();
  const [postsByUser, setPostsByUser] = useState([]);

  useEffect(() => {
    const fetchUserByUserName = async (username) => {
      const response = await axios.get("/api/post/:username", username);
      setPostsByUser(response.data);
    };
  }, []);

  const orderedPostsByUser = Array.isArray(postsByUser)
    ? posts.sort((post1, post2) => {
        const time1 = new Date(post1.postTime).getTime();
        const time2 = new Date(post2.postTime).getTime();
        return time2 - time1;
      })
    : [];

  return (
    <div>
      <NavBar />
      <h1>User Profile: {username}</h1>
      {/* Fetch and display user posts*/}
    </div>
  );
};

export default UserProfile;
