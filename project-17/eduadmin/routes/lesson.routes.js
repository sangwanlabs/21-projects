import express from "express";
import { createLesson, getLessons } from "../controllers/lesson.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/", protect, createLesson);
router.get("/:moduleId", getLessons);
export default router;
