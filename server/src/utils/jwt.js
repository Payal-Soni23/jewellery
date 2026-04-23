import jwt from "jsonwebtoken";

export const createToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const extractBearerToken = (authHeader) => {
  if (!authHeader || typeof authHeader !== "string" || !authHeader.startsWith("Bearer ")) {
    return "";
  }

  return authHeader.split(" ")[1]?.trim() || "";
};
