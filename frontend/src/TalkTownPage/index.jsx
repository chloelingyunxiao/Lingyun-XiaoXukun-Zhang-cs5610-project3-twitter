import { useEffect } from "react";
import NavBar from "../NavBar";
import Post from "../Post";
import axios from "axios";
import { useState } from "react";

// const posts = [
//   {
//     avatar:
//       "https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg",
//     username: "lx",
//     nickname: "lingyunHappy", // nickname
//     timeStamp: "2021-01-01 12:00:00",
//     content: "This is the body of post 1",
//     media: {
//       type: "image",
//       url: "https://example.com/image1.jpg",
//     },
//   },
//   {
//     avatar:
//       "https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg",
//     username: "User 2",
//     nickname: "usernickname_2",
//     timeStamp: "2021-01-02 12:00:00",
//     content: "This is the body of post 2",
//     media: {
//       type: "video",
//       url: "https://example.com/video1.mp4",
//     },
//   },
//   {
//     avatar:
//       "https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg",
//     username: "User 3",
//     nickname: "usernickname_3",
//     timeStamp: "2021-01-03 12:00:00",
//     content: "This is the body of post 3",
//     media: null,
//   },
// ];

const TalkTownPage = () => {
  const [posts, setPosts] = useState([]);

  // fetch all posts from database when loading
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/post");
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
        orderedPosts.map((post, index) => <Post key={index} post={post} />)
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default TalkTownPage;
