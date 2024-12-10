import { useParams } from "react-router-dom";
import NavBar from "../NavBar";
import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import Post from "../Post";
import { UserContext } from "../context/userContext";

const UserProfile = () => {
  const { username } = useParams();
  const { currentUser } = useContext(UserContext);
  const loggedInUsername = currentUser.username;

  const [currentSearchUser, setCurrentSearchUser] = useState(null);
  const [postsByUsername, setPostsByUsername] = useState([]);
  const [
    isLoggedInUsernameMatchCurrentSearchUser,
    setIsLoggedInUsernameMatchCurrentSearchUser,
  ] = useState(false);

  const fetchUserByUserName = async () => {
    try {
      const response = await axios.get(`/api/users/${username}`);
      setCurrentSearchUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error.message);
    }
  };

  const fetchPostsByUserName = async () => {
    try {
      const response = await axios.get(`/api/posts/${username}`);
      setPostsByUsername(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  // Fetch user and posts while loading
  useEffect(() => {
    fetchUserByUserName();
    fetchPostsByUserName();
  }, [username]);

  // Update match status when `currentSearchUser` changes
  useEffect(() => {
    if (currentSearchUser?.username === loggedInUsername) {
      setIsLoggedInUsernameMatchCurrentSearchUser(true);
    } else {
      setIsLoggedInUsernameMatchCurrentSearchUser(false);
    }
  }, [currentSearchUser, loggedInUsername]);

  const handleDeletePost = async (deletePostId) => {
    try {
      const response = await axios.delete(`/api/posts/delete/${deletePostId}`);
      console.log("Post deleted successfully!", response.data);
      // Delete success, re-fetch posts
      fetchPostsByUserName();
    } catch (e) {
      console.error(
        "The post can't be deleted!",
        e.response?.data || e.message
      );
    }
  };

  // Order posts by time using useMemo
  const orderedPosts = useMemo(() => {
    if (!Array.isArray(postsByUsername)) return [];
    return postsByUsername.sort((post1, post2) => {
      const time1 = new Date(post1.postTime).getTime();
      const time2 = new Date(post2.postTime).getTime();
      return time2 - time1;
    });
  }, [postsByUsername]);

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
        orderedPosts.map((post) => (
          <Post
            key={post._id}
            post={post}
            isLoggedInUserNameMatchPostUserName={
              isLoggedInUsernameMatchCurrentSearchUser
            }
            onDelete={() => {
              handleDeletePost(post._id);
            }}
          />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default UserProfile;
