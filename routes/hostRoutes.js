// routes/hostRoutes.js
const express = require("express");
const hostRouter = express.Router();
const hostController = require("../controllers/hostController");

hostRouter.get("/add-home", hostController.getHome);
hostRouter.post("/add-home", hostController.postHome);
hostRouter.get("/hostList", hostController.hostList);
hostRouter.get("/edit/:homeId", hostController.getEditHome);
hostRouter.post("/edit/:homeId", hostController.postEditHome);

module.exports = hostRouter;
