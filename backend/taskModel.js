const mongoose = require("mongoose");

const taskSchem = new mongoose.Schema({
  text: String,
  day: String,
  reminder: Boolean,
});

const Task = mongoose.model("Task", taskSchem);

module.exports = Task;
