const { Schema } = require("mongoose");
const userCollection = process.env.USER_COLLECTION || "userCollection";

exports.UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg",
    },
    timeStamp: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: userCollection }
);
