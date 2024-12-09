import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { useNavigate } from "react-router";
import "./style.css";

export const CreatePostPage = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const username = currentUser.username;
  const nickname = currentUser.nickname;
  const avatar = currentUser.avatar;

  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);

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
      <button onClick={handleSubmitNewPost}>Submit Post</button>
    </div>
  );
};
