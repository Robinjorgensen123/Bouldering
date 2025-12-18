import { Router } from "express";
import {
  createBoulder,
  getAllBoulders,
  getBoulderById,
} from "../controllers/boulder.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protect, getAllBoulders);
router.get("/:id", protect, getBoulderById);
router.post("/", protect, createBoulder);

export default router;
