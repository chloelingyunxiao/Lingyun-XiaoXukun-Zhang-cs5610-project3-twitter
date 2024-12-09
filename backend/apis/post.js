const express = require("express");
const router = express.Router();

const PostModel = require("../db/post/post.model");
const { createPost, findPostsByUsername } = require("../db/post/post.model");

// router.get("/username/:username", async function (req, res) {
//   const username = req.params.username;
//   const posts = await findPostsByUsername(username);

//   if (!posts) {
//     return res.status(404).send("No posts found");
//   }
//   console.log(username, "'s post found:", posts);
//   res.send(posts);
// });

router.post("/newpost", async function (req, res) {
  const { username, postTime, content, media } = req.body;

  try {
    if (!username || !postTime || !content) {
      return res.status(400).send("Missing username, posttime, or content");
    }

    const newPost = await PostModel.createPost({
      username,
      postTime,
      content,
      media,
    });

    console.log("New post created:", newPost);
    res.status(201).send(newPost);
  } catch (e) {
    console.error("Error creating post:", e);
    res.status(500).send("No new post has been added!");
  }
});

module.exports = router;
