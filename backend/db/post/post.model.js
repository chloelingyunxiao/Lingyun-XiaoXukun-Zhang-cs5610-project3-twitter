require("dotenv").config();
const mongoose = require("mongoose");
const PostSchema = require("./post.schema").PostSchema;

const postCollection = process.env.POST_COLLECTION || "postCollection";

// Create a model for the PostSchema
const PostModel = mongoose.model("PostModel", PostSchema, postCollection);

function createPost(post) {
  return PostModel.create(post);
}

function findPostsByUsername(username) {
  return PostModel.find({ username: username }).exec();
}

module.exports = {
  PostModel,
  createPost,
  findPostsByUsername,
};
