import { Router } from "express";
import { authentication } from "../../middleware/protected.js";
import { currentUser } from "../../controller/user.controller.js";

const router = Router();
router.get("/current-user", authentication, currentUser);
export default router;
