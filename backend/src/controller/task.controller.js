import Task from "../model/task.js";

export const createTask = async (req, res) => {
  const { title, desc } = req.body;
  if (!title | !desc)
    return res.status(404).json({
      status: "faild",
      message: "fill all fields",
    });
  try {
    const task = new Task({
      title,
      desc,
      userRef: req.user._id,
    });
    await task.save();
    res.status(201).json({
      status: "success",
      task,
    });
  } catch (error) {
    res.status(500).json({
      status: "faild",
      message: "Logout failed",
      error: error.message,
    });
  }
};
export const GetMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userRef: req.user._id });

    res.status(200).json({
      status: "success",
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Server error",
      error: error.message,
    });
  }
};

export const DeleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.taskId,
      userRef: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        status: "failed",
        message: "You can delete only your own tasks",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Server error",
      error: error.message,
    });
  }
};
