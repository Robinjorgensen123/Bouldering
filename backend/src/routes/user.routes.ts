import { protect } from "../middleware/auth.middleware.js"
import { Router } from "express"
import { updateUserSettings, getUserProfile } from "../controllers/user.controller.js"

const router = Router()

router.get("/profile", protect, getUserProfile)
router.patch("/settings", protect, updateUserSettings)

export default router