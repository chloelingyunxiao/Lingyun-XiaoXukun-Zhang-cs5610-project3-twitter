const { Schema } = require("mongoose");
const postCollection = process.env.POST_COLLECTION || "postCollection";

exports.PostSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    postTime: {
      type: Date,
      required: true,
      default: Date.now,
    },
    content: {
      type: String,
      required: true,
    },
    media: {
      type: {
        type: String,
        enum: ["image", "video"],
        required: false,
      },
      url: {
        type: String,
      },
    },
  },
  { collection: postCollection }
);
