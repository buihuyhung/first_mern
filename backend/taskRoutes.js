const express = require("express");
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("./taskController");

const router = express.Router();

router.route("/").get(getAllTasks).post(createTask);

router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

module.exports = router;
