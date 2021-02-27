const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const globalErrorController = require("./errorController");
const taskRouter = require("./taskRoutes");
const AppError = require("./utils/appError");

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

app.use("/api/v1/tasks", taskRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorController);

module.exports = app;
