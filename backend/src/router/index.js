import { Router } from "express";

const router = Router();
import authRouter from "./api/auth.js";
import userRouter from "./api/user.js";
import taskRouter from "./api/task.js";
import { authentication } from "../middleware/protected.js";

router.use("/auth", authRouter);
router.use("/", userRouter);
router.use("/tasks", authentication, taskRouter);
export default router;
