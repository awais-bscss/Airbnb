const express = require("express");
const hostRouter = express.Router();
const path = require("path");
const rootPath = require("../utils/pathUtil");
const homeController = require("../controllers/home");

hostRouter.get("/add-home", homeController.getHome);
hostRouter.post("/add-home", homeController.postHome);
exports.hostRouter = hostRouter;
