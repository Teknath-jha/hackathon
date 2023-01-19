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
app.use(express.static(path.join(__dirname, "../frontend/build")));

//Importing Routes
const post = require("./routes/post");
const user = require("./routes/user");

//Using routes
app.use("/api/v1", post);
app.use("/api/v1", user);

// ---------deployment--------------------

// __dirname = path.resolve();

// else {
//   app.get("/", (req, res) => {
//     res.send("API is running");
//   });
// }


app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

module.exports = app;
