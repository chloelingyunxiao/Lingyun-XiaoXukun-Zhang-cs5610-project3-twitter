import { useParams } from "react-router-dom";
import NavBar from "../NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../Post";

const UserProfile = () => {
  const { username } = useParams();
  const [currentSearchUser, setCurrentSearchUser] = useState(null);
  const [postsByUsername, setPostsByUsername] = useState([]);

  useEffect(() => {
    const fetchUserByUserName = async (username) => {
      try {
        const response = await axios.get(`/api/users/${username}`);
        setCurrentSearchUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    const fetchPostsByUserName = async (username) => {
      try {
        const response = await axios.get(`/api/posts/${username}`);
        setPostsByUsername(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchUserByUserName(username);
    fetchPostsByUserName(username);
  }, [username]);

  const orderedPosts = Array.isArray(postsByUsername)
    ? postsByUsername.sort((post1, post2) => {
        const time1 = new Date(post1.postTime).getTime();
        const time2 = new Date(post2.postTime).getTime();
        return time2 - time1;
      })
    : [];

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

      <h2>User's Posts</h2>
      {orderedPosts.length > 0 ? (
        orderedPosts.map((post, index) => <Post key={index} post={post} />)
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default UserProfile;
