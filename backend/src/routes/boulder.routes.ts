import { Router } from "express";
import {
  createBoulder,
  getAllBoulders,
} from "../controllers/boulder.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protect, getAllBoulders);
router.post("/", protect, createBoulder);

export default router;
