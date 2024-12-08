require("dotenv").config();
const express = require("express");
const helper = require("./apis/helper");
const pokemon = require("./apis/pokemon");
const users = require("./apis/user");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

console.log(process.env.MONGODB_URI);

console.log("Connecting to MongoDB...");
const mongoDBEndpoint = process.env.MONGODB_URI;
console.log(mongoDBEndpoint);
mongoose.connect(mongoDBEndpoint, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to MongoDB:"));
db.once("open", function () {
  console.log("Connected to MongoDB successfully!");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/pokemon/", pokemon);
app.use("/api/users/", users);

let frontend_dir = path.join(__dirname, "..", "frontend", "dist");

app.use(express.static(frontend_dir));
app.get("*", function (req, res) {
  console.log("received request");
  res.sendFile(path.join(frontend_dir, "index.html"));
});

console.log("Starting server now...");
app.listen(process.env.PORT || 5001, function () {
  console.log("Starting server now on http://localhost:5001");
});

// const http = require('http');

// const server = http.createServer(function (request, response) {

//     response.writeHead(200, { 'Content-Type': 'text/plain' });
//     response.end('Hello web dev!');

// })

// 127.0.0.1 === localhost
// server.listen(8000, "127.0.0.1", function () {
//   console.log("The server has started!");
// });