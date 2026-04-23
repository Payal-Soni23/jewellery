import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[request] ${req.method} ${req.originalUrl}`);
  next();
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API is running" });
});

app.use("/api/auth", authRoutes);
console.log("[routes] mounted /api/auth");
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Jewellery API is running"
  });
});
app.use(notFound);
app.use(errorHandler);

export default app;
