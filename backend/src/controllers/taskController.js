const Task = require("../models/Task");


// CREATE TASK
const createTask = async (req, res) => {
  try {

    const {
      title,
      description,
      project,
      assignedTo,
      priority,
      dueDate,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      priority,
      dueDate,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET TASKS
const getTasks = async (req, res) => {
  try {

    const tasks = await Task.find()
      .populate("project", "title")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name");

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE TASK STATUS
const updateTaskStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      message: "Task updated",
      task,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
};