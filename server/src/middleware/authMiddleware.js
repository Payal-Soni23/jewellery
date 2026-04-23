import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { extractBearerToken } from "../utils/jwt.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ success: false, message: "JWT configuration missing" });
    }

    const token = extractBearerToken(authHeader);

    if (!token) {
      return res.status(401).json({ success: false, message: "Authorization token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded?.id || decoded?._id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Invalid token payload" });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    res.status(401).json({ success: false, message: "Not authorized, token invalid or expired" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ success: false, message: "Admin access required" });
  }

  next();
};
