import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import "./style.css";

export const CreatePostPage = ({ isCreatePost }) => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { postId } = useParams();

  const username = currentUser.username;
  const nickname = currentUser.nickname;
  const avatar = currentUser.avatar;

  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);

  // useEffect fetch post - pending update!

  const handleSubmitNewPost = async () => {
    const newPost = {
      username: username,
      nickname: nickname,
      avatar: avatar,
      postTime: Date.now(),
      content: content,
      media: media,
    };

    try {
      const response = await axios.post("/api/posts/newpost", newPost);
      console.log("Post created successfully:", response.data);
      navigate("/talktown");
    } catch (error) {
      console.error("Error creating post:", error.response || error.message);
    }
  };

  const handleUpdatePost = async () => {
    console.log("The update postId is: ", postId);

    const updatedPost = {
      username: username,
      nickname: nickname,
      avatar: avatar,
      postTime: Date.now(),
      content: content,
      media: media,
    };

    // update the original post and response including the updatedPost
    try {
      const response = await axios.put(
        `/api/posts/update/${postId}`,
        updatedPost
      );
      console.log("Post updated successfully!");
      navigate(`/user/${username}`);
    } catch (e) {
      console.error("Error updating post:", e.response || e.message);
    }
  };

  return (
    <div className="create-post-container">
      <div className="user-info">
        <img src={avatar} alt="User Avatar" className="user-avatar" />
        <div>{username}</div>
        <div>{nickname}</div>
      </div>
      <textarea
        placeholder="Enter your post content"
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your media URL"
        onChange={(e) => setMedia(e.target.value)}
      />
      {isCreatePost ? (
        <button onClick={handleSubmitNewPost}>Submit Post</button>
      ) : (
        <button onClick={handleUpdatePost}>Update Post</button>
      )}
    </div>
  );
};
