import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import { updateProfile } from "../controllers/user.controller";
import { getProfile } from "../controllers/user.controller";

const router = Router()

router.get("/getProfile", isAuthenticated, getProfile);
router.put("/updateProfile", isAuthenticated, updateProfile);

export default router