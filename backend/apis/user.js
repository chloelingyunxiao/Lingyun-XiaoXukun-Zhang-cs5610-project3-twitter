const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const UserModel = require("../db/user/user.model");
const { findUserByUsername } = require("../db/user/user.model");
const { updateUserDescription } = require("../db/user/user.model");

const userDB = [];

router.get("/", function (request, response) {
  response.send(userDB);
  console.log("This is the userDB");
  console.log(userDB);
});

router.post("/", async function (request, response) {
  const body = request.body;
  const newUserResponse = await UserModel.createUser(body);
  response.send("Created new user!");
});

router.post("/login", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const loginResponse = await UserModel.findUserByUsername(username);

    console.log("Login response:", loginResponse);
    if (loginResponse.password !== password) {
      return res.status(403).send("Invalid password");
    }

    const token = jwt.sign(username, "HUNTERS_PASSWORD");

    res.cookie("username", token);

    return res.send("User known and logged in");
  } catch (e) {
    res.status(401).send(null);
  }
});

router.post("/register", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const nickname = req.body.nickname;
  const avatar = req.body.avatar; // undefined or a string
  const description = req.body.description;

  try {
    if (!username || !password || !nickname) {
      return res.status(409).send("Missing username, nickname or password");
    }

    const createUserResponse = await UserModel.createUser({
      username: username,
      nickname: nickname,
      password: password,
      avatar: avatar,
      description: description || "",
    });

    const token = jwt.sign(username, "HUNTERS_PASSWORD");

    res.cookie("username", token);

    return res.send("User created successfully");
  } catch (e) {
    res.status(401).send("Error: username already exists");
  }
});

// Check if the user is logged in and return the user data
router.get("/isLoggedIn", async function (req, res) {
  const username = req.cookies.username;

  if (!username) {
    return res.send({ user: null });
  }

  let decryptedUsername;
  try {
    decryptedUsername = jwt.verify(username, "HUNTERS_PASSWORD");
  } catch (e) {
    console.error("Error verifying token:", e);
    return res.send({ user: null });
  }

  // Find the user in the database
  try {
    const user = await findUserByUsername(decryptedUsername);
    if (!user) {
      return res.send({ user: null });
    }
    console.log("Found user:", user);
    return res.send({ user });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).send({ user: null });
  }
});

router.post("/logOut", async function (req, res) {
  res.cookie("username", "", {
    maxAge: 0,
  });

  res.send(true);
});

router.get("/:username", async function (req, res) {
  const username = req.params.username;

  const userData = await UserModel.findUserByUsername(username);

  return res.send(userData); // return user object
});

// Update user description in userProfilePage
router.put("/update/description", async function (req, res) {
  const { username, description } = req.body;
  
  if (description && description.length > 200) {
    return res.status(400).send("Description cannot be longer than 200 characters");
  }
  
  try {
    const updatedUser = await updateUserDescription(username, description);
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    
    console.log("Description updated successfully:", updatedUser);
    return res.send(updatedUser);
  } catch (error) {
    console.error("Error updating description:", error);
    return res.status(500).send("Error updating description");
  }
});

module.exports = router;
