import { Router } from "express";
import {
  createTask,
  DeleteTask,
  GetMyTasks,
} from "../../controller/task.controller.js";
import { authentication } from "../../middleware/protected.js";

const router = Router();

router.post("/create", authentication, createTask);
router.get("/", authentication, GetMyTasks);
router.delete("/:taskId", authentication, DeleteTask);

export default router;
