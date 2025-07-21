const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const userRouter = require("./routes/userRoutes");
const hostRouter = require("./routes/hostRoutes");
const rootPath = require("./utils/pathUtil");
app.use(express.static(path.join(rootPath, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRouter);
app.use("/host", hostRouter);
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootPath, "views", "404.html"));
});
const port = 3002;
app.listen(port, () => {
  console.log(`server running on address http://localhost:${port}`);
});
