import express from "express";
import { createCourse, getCourses } from "../controllers/course.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/", protect, createCourse);
router.get("/", getCourses);
export default router;
