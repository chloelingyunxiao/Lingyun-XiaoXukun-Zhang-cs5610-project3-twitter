import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import "./style.css";

export const CreateOrUpdatePostPage = ({ isCreatePost }) => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { postId } = useParams();
  const [originalPost, setOriginalPost] = useState(null);

  const username = currentUser.username;
  const nickname = currentUser.nickname;
  const avatar = currentUser.avatar;

  const [content, setContent] = useState("");
  const maxLength = 280;
  const [media, setMedia] = useState(null);

  const handleSubmitNewPost = async () => {
    if (!content.trim()) {
      alert("Please enter some content");
      return;
    }

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

  const handleCancel = () => {
    const confirmMessage = isCreatePost 
      ? "Are you sure you want to cancel creating this post?" 
      : "Are you sure you want to cancel editing this post?";
    
    if (content.trim() && !window.confirm(confirmMessage)) {
      return;
    }
    
    if (!isCreatePost) {
      navigate(`/user/${username}`);
    } else {
      navigate("/talktown");
    }
  };

  useEffect(() => {
    const fetchOriginalPost = async () => {
      try {
        const response = await axios.get(`/api/posts/get/${postId}`);
        const fetchedPost = response.data;
        console.log("Original Post is:", fetchedPost);
        setContent(fetchedPost.content); // Set it into text box directly
      } catch (e) {
        console.error("Error fetching original post:", e.response || e.message);
      }
    };

    if (!isCreatePost && postId) {
      fetchOriginalPost();
    }
  }, [postId, isCreatePost]);

  return (
    <div className="create-post-container">
      <h2>{isCreatePost ? "Create New Post" : "Edit Post"}</h2>
      <div className="user-info">
        <img src={avatar} alt="User Avatar" className="user-avatar" />
        <div className="user-details">
          <div className="username">{username}</div>
          <div className="nickname">{nickname}</div>
        </div>
      </div>
      <div className="content-input">
        <textarea
          value={content}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) {
              setContent(e.target.value);
            }
          }}
          maxLength={maxLength}
          placeholder="What's happening?"
        />
        <div className="char-count">
          {content.length}/{maxLength}
        </div>
      </div>
      
      <div className="button-group">
        <button 
          className="cancel-button" 
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button 
          className="submit-button"
          onClick={isCreatePost ? handleSubmitNewPost : handleUpdatePost}
          disabled={!content.trim()}
        >
          {isCreatePost ? "Post" : "Save Changes"}
        </button>
      </div>
    </div>
  );
};
