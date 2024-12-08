const Schema = require("mongoose").Schema;

exports.UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    nickname: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      default:
        "https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg",
    },
  },
  { collection: "userCollection2" }
);
