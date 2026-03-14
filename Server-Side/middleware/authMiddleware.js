import jwt, { decode } from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;

        if (!token)
            return res.status(401).json({ message: "Unauthorized. No token provided" });

        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        req.user = {
            id: decoded.id,
            role: decoded.role,
        };

        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Access token expired",
            });
        }

        return res.status(401).json({
            message: "Invalid token",
        });
    }
}