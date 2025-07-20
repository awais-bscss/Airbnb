const express = require("express");
const path = require("path");
const rootPath = require("../utils/pathUtil");
const userRouter = express.Router();
userRouter.get("/", (req, res, next) => {
  res.sendFile(path.join(rootPath, "views", "home.html"));
});
module.exports = userRouter;
