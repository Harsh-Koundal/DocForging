import bcrypt from "bcryptjs";
import validator from "validator";
import User from "../model/User.js";
import crypto from "crypto";
import RefreshToken from "../model/RefreshToken.js";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import sendEmail from "../utils/sendEmail.js";

export const signup = async (req, res, next) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password)
            return res.status(400).json({ message: "Name, Email & Password are required" });

        if (!validator.isEmail(email))
            return res.status(400).json({ message: "Invalid Format" });

        if (password.length < 6)
            return res.status(400).json({ message: "Password must be 6 characters" });

        if (!validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 0,
            minUppercase: 0,
            minNumbers: 0,
            minSymbols: 0,
        }))
            return res.status(400).json({ message: "Password must include uppercase, lowercase, number and symbol" });

        const existingUser = await User.findOne({
            email: email.toLowerCase().trim(),
        });

        if (existingUser)
            return res.status(409).json({ message: "User already Exists" });

        const saltRounds = 12;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const verificationToken = crypto.randomBytes(32).toString("hex");

        const verificationTokenHash = crypto
            .createHash("sha256")
            .update(verificationToken)
            .digest("hex");

        const verificationTokenExpires = Date.now() + 15 * 60 * 1000;

        const newUser = await User.create({
            name:name,
            email: email.toLowerCase().trim(),
            passwordHash,
            verificationTokenHash,
            verificationTokenExpires,
        });

        const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

        await sendEmail({
            to: newUser.email,
            subject: "Verify Your Email",
            html: `
            <h2>Email Verification</h2>
            <p>Click the link below to verify your account:</p>
            <a href="${verifyUrl}"><b>Click Here</b></a>
            `
        })

        return res.status(201).json({
            message: "User Created Successfully",
            user: {
                id: newUser._id,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (err) {
        console.error("Sign up error", err);
        return next(err);
    }
};

export const verfiyEmail = async(req,res,next)=>{
    try{
        const {token} = req.query;

        if(!token){
            return res.status(400).json({message:"Invalid token"});
        }

        const tokenHash = crypto
         .createHash("sha256")
         .update(token)
         .digest("hex");

         const user = await User.findOne({
            verificationTokenHash:tokenHash,
            verificationTokenExpires:{$gt:Date.now()},
         });

         if(!user)
            return res.status(400).json({message:"Token expired or invalid"});

         user.isVerified = true,
         user.verificationTokenHash = undefined;
         user.verificationTokenExpires = undefined;

        await user.save();

        return res.status(200).json({message:"Email verified successfully"});

    }catch(err){
        console.error("Failed to verify email",err);
        return next(err);
    }
}
