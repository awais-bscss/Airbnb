const express = require("express");
const hostRouter = express.Router();
const path = require("path");
const rootPath = require("../utils/pathUtil");

hostRouter.get("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootPath, "views", "addHome.html"));
});
hostRouter.post("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootPath, "views", "homeAdded.html"));
});
module.exports = hostRouter;
