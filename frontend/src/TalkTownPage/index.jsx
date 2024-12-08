import NavBar from "../NavBar";
import Post from "../Post";

const posts = [
  {
    avatar:
      "https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg",
    username: "lx",
    nickname: "lingyunHappy", // nickname
    timeStamp: "2021-01-01 12:00:00",
    content: "This is the body of post 1",
    media: {
      type: "image",
      url: "https://example.com/image1.jpg",
    },
  },
  {
    avatar:
      "https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg",
    username: "User 2",
    nickname: "usernickname_2",
    timeStamp: "2021-01-02 12:00:00",
    content: "This is the body of post 2",
    media: {
      type: "video",
      url: "https://example.com/video1.mp4",
    },
  },
  {
    avatar:
      "https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg",
    username: "User 3",
    nickname: "usernickname_3",
    timeStamp: "2021-01-03 12:00:00",
    content: "This is the body of post 3",
    media: null,
  },
];

const TalkTownPage = () => {
  const orderedPosts = posts.sort((post1, post2) => {
    if (post1.timeStamp < post2.timeStamp) {
      return 1;
    } else if (post1.timeStamp > post2.timeStamp) {
      return -1;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <NavBar />
      {orderedPosts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
};

export default TalkTownPage;
