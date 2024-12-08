import React from "react";
import "./style.css";

const Post = ({ post }) => {
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="post">
      <div className="post-header">
        <img src={post.avatar} alt="User Avatar" className="avatar" />
        <div className="user-info">
          <div className="user-name">
            {post.nickname && <span className="nickname">{post.nickname}</span>}
            {post.username && (
              <span className="username"> @{post.username}</span>
            )}
            <div className="timestamp">{post.timeStamp}</div>
          </div>
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>

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
