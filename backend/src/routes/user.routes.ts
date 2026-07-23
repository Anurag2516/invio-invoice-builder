import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import { updateProfile } from "../controllers/user.controller";
import { getProfile } from "../controllers/user.controller";

const router = Router()

router.put("/profile", isAuthenticated, updateProfile)
router.get("/profile", isAuthenticated, getProfile);

export default router