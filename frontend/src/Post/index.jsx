import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Post = ({ post, isLoggedInUserNameMatchPostUserName }) => {
  if (!post) {
    return <div>Post not found</div>;
  }
  const postId = post._id;

  const handleDeletePost = async () => {
    try {
      const response = await axios.delete(`/api/posts/delete/${postId}`);
      console.log("Post deleted successfully!", response.data);
    } catch (e) {
      console.error(
        "The post can't be deleted!",
        e.response?.data || e.message
      );
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <img src={post.avatar} alt="User Avatar" className="avatar" />
        <div className="user-info">
          <div className="user-name">
            {post.nickname && <span className="nickname">{post.nickname}</span>}
            <Link to={`/user/${post.username}`} className="username">
              @{post.username}
            </Link>
            <div className="timestamp">{post.postTime}</div>
          </div>
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
        {isLoggedInUserNameMatchPostUserName ? (
          <div>
            <Link to={`/updatepost/${postId}`}>Update this post</Link>
            <button className="delete-button" onClick={handleDeletePost}>
              delete post
            </button>
          </div>
        ) : (
          <div />
        )}
        {/* Render media if available */}
        {post.media && post.media.type === "image" && (
          <img src={post.media.url} alt="Post Media" className="post-media" />
        )}
        {post.media && post.media.type === "video" && (
          <video controls className="post-media">
            <source src={post.media.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default Post;
