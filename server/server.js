import { app, server } from "./socket/socket.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import messageRoute from "./routes/message.route.js";
import userRoute from "./routes/user.route.js";
import { connectDB } from "./db/connection1.db.js";
import { errorMiddleware } from "./middlewares/error.middlware.js";

// Load env variables if not already loaded (only for local dev)
import dotenv from "dotenv";
dotenv.config();

connectDB();

// Log current allowed origin
const allowedOrigin = process.env.CLIENT_URL || "http://localhost:3000";
console.log("Allowed CORS origin:", allowedOrigin);

// CORS setup
const allowedOrigins = [
  allowedOrigin,
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// Global error handler
app.use(errorMiddleware);

// Server start
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Your server is listening at port ${PORT}`);
});
