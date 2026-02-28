import express from "express";
import { login, signup, verfiyEmail } from "../controller/authController.js";
import { authLimiter, loginLimiter, signupLimiter } from "../middleware/ratelimitMiddleware.js";

const router = express.Router();

router.post("/signup",signupLimiter,signup);
router.post("/verify",authLimiter,verfiyEmail);
router.post("/login",loginLimiter,login);

export default router;