import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import "./style.css";

export const CreatePostPage = ({ isCreatePost }) => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { postId } = useParams();
  const [originalPost, setOriginalPost] = useState(null);

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

  useEffect(() => {
    const fetchOriginalPost = async () => {
      try {
        const response = await axios.get(`/api/posts/get/${postId}`);
        const fetchedPost = response.data;
        console.log("Original Post is:", fetchedPost);
        setOriginalPost(fetchedPost);
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
      <div className="user-info">
        <img src={avatar} alt="User Avatar" className="user-avatar" />
        <div>{username}</div>
        <div>{nickname}</div>
      </div>
      {isCreatePost ? (
        <div></div>
      ) : (
        <div>
          <div>original post content</div>
          <div>{originalPost?.content}</div>
        </div>
      )}
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
