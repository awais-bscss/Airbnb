const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoutes");
const { hostRouter } = require("./routes/hostRoutes");
const rootPath = require("./utils/pathUtil");
const homeController = require("./controllers/home");
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(rootPath, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRouter);
app.use("/host", hostRouter);
app.use(homeController.notFound);
const port = 3002;
app.listen(port, () => {
  console.log(`server running on address http://localhost:${port}`);
});
