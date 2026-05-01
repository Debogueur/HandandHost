import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { routes } from "./routes";
import { AppDataSource } from "./core/database-config";

dotenv.config();

const start = async () => {
  try {
    await AppDataSource.initialize();

    const app = express();

    // ========================
    // 🔐 SECURITY MIDDLEWARE
    // ========================

    app.use(helmet()); // security headers

    app.use(express.json({ limit: "10mb" })); // prevent large payload attacks
    app.use(cookieParser());

    // ========================
    // 🌐 CORS CONFIG (SECURE)
    // ========================
    app.use(
      cors({
        credentials: true,
        origin: [
          "http://www.handandhost.com/",
          "https://www.handandhost.com/",
          "http://localhost:3000",
          "http://localhost:3001",
          "http://localhost:3002",
          "http://16.112.123.238",
          "http://16.112.161.106"
        ],
      })
    );

    // ========================
    // 🚨 RATE LIMIT (ANTI-BRUTE FORCE)
    // ========================
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 200, // limit per IP
      message: {
        success: false,
        message: "Too many requests, please try again later.",
      },
    });

    app.use(limiter);

    // ========================
    // 🧭 ROUTES
    // ========================
    routes(app);

    // ========================
    // 🚀 START SERVER
    // ========================
    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("DB Connection Error:", error);
    throw new Error("Unable to connect DB");
  }
};

start();