const express = require("express");
const path = require("path");
const rootPath = require("../utils/pathUtil");
const { registeredHomes } = require("./hostRoutes");
const userRouter = express.Router();
const homeController = require("../controllers/home");
userRouter.get("/", homeController.addHome);
module.exports = userRouter;
