// app.js
const express = require("express");
const app = express();
const path = require("path");
const userRouter = require("./routes/storeRoutes");
const hostRouter = require("./routes/hostRoutes");
const rootPath = require("./utils/pathUtil");
const storeController = require("./controllers/storeController");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(rootPath, "public")));
app.use(express.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
  console.log(`Request URL: ${req.originalUrl}`);
  next();
});

// Register routes
try {
  app.use("/host", hostRouter);
  console.log("hostRouter registered successfully");
  app.use(userRouter);
  console.log("userRouter registered successfully");
  app.use((req, res, next) => {
    console.log(`Catch-all triggered for: ${req.originalUrl}`);
    storeController.notFound(req, res, next);
  });
  console.log("notFound middleware registered successfully");
} catch (err) {
  console.error("Error registering routes:", err);
  process.exit(1);
}

const port = 3002;
app.listen(port, () => {
  console.log(`Server running on address http://localhost:${port}`);
});
