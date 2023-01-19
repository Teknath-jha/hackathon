const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//Using Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true })); //else use body parser
app.use(cookieParser());

//Importing Routes
const post = require("./routes/post");
const user = require("./routes/user");

//Using routes
app.use("/api/v1", post);
app.use("/api/v1", user);

// ---------deployment--------------------

// __dirname = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running");
//   });
// }

module.exports = app;
