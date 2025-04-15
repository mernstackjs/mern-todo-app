import mongoose, { model, Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: String,
    desc: String,
    userRef: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = model("Task", taskSchema);

export default Task;
