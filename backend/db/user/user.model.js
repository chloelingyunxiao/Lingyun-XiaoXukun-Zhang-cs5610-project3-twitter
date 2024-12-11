require("dotenv").config();
const mongoose = require("mongoose");
const UserSchema = require("./user.schema").UserSchema;

const userCollection = process.env.USER_COLLECTION || "userCollection";

const UserModel = mongoose.model("UserModel", UserSchema, userCollection);

function createUser(user) {
  return UserModel.create(user);
}

function findUserByUsername(username) {
  return UserModel.findOne({ username: username }).exec();
}

function updateUserDescription(username, description) {
  return UserModel.findOneAndUpdate(
    { username: username },
    { description: description },
    { new: true }
  ).exec();
}

function findAllUsers() {
  return UserModel.find().exec();
}

function updatePassword(username, newPassword) {
  return UserModel.findOneAndUpdate(
    { username },
    { password: newPassword },
    { new: true }
  ).exec();
}

function deleteUserByUsername(username) {
  return UserModel.findOneAndDelete({ username: username }).exec();
}

module.exports = {
  UserModel,
  createUser,
  findUserByUsername,
  updateUserDescription,
  updatePassword,
  deleteUserByUsername,
  findAllUsers,
};
