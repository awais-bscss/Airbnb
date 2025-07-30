// routes/userRoutes.js
const express = require("express");
const userRouter = express.Router();
const homeController = require("../controllers/storeController");

userRouter.get("/", homeController.addHome);
userRouter.get("/index", homeController.index);
userRouter.get("/bookings", homeController.bookings);
userRouter.get("/favouriteList", homeController.favouriteList);
userRouter.get("/book/:homeId", homeController.homeBooked);
userRouter.get("/detail/:homeId", homeController.homeDetail);

module.exports = userRouter;
