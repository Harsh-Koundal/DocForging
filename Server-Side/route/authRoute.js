import express from "express";
import { login, logout, signup, verfiyEmail } from "../controller/authController.js";
import { authLimiter, loginLimiter, signupLimiter } from "../middleware/ratelimitMiddleware.js";

const router = express.Router();

router.post("/signup",signupLimiter,signup);
router.get("/verify/:token",authLimiter,verfiyEmail);
router.post("/login",loginLimiter,login);
router.post("/logout",logout);

export default router;