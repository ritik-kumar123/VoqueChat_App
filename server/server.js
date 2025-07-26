import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { app, server } from "./socket/socket.js";
import messageRoute from "./routes/message.route.js";
import userRoute from "./routes/user.route.js";
import { connectDB } from "./db/connection1.db.js";
import { errorMiddleware } from "./middlewares/error.middlware.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// === CORS Setup ===
const localFrontend = "http://localhost:3000";
const renderFrontend = "https://voquechat.onrender.com"; 
const allowedOrigin = process.env.CLIENT_URL || localFrontend;

const allowedOrigins = [allowedOrigin, renderFrontend, localFrontend];

console.log("✅ Allowed CORS Origins:", allowedOrigins);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, 
  })
);

// Preflight support
app.options("*", cors());

// === Middleware ===
app.use(express.json());
app.use(cookieParser());

// === Routes ===
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// === Error handler ===
app.use(errorMiddleware);

// === Start Server ===
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
