import express from "express";
import { getCurrentUser, getDashboardData } from "../controller/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/me",getCurrentUser)
router.get("/",getDashboardData);

export default router;