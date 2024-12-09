import { useEffect } from "react";
import NavBar from "../NavBar";
import Post from "../Post";
import axios from "axios";
import { useState } from "react";

const TalkTownPage = () => {
  const [posts, setPosts] = useState([]);

  // fetch all posts from database when loading
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPosts(response.data);
        console.log("posts list: ", response.data);
      } catch (e) {
        console.error("Error fetching posts:", e);
      }
    };

    fetchPosts();
  }, []);

  const orderedPosts = Array.isArray(posts)
    ? posts.sort((post1, post2) => {
        const time1 = new Date(post1.postTime).getTime();
        const time2 = new Date(post2.postTime).getTime();
        return time2 - time1;
      })
    : [];

  return (
    <div>
      <NavBar />
      {orderedPosts.length > 0 ? (
        orderedPosts.map((post, index) => (
          <Post
            key={index}
            post={post}
            isLoggedInUserNameMatchPostUserName={false}
          />
        )) // on talktown page, the update and delete button will not be displayed
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default TalkTownPage;
