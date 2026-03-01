import express from "express";
import { createModule, getModules } from "../controllers/module.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/", protect, createModule);
router.get("/:courseId", getModules);
export default router;
