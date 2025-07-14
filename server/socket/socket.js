import dotenv from "dotenv";
dotenv.config();

import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const allowedOrigin = process.env.CLIENT_URL || "http://localhost:3000";
console.log("Socket.IO CORS origin:", allowedOrigin);

const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    credentials: true, // ✅ Allow cookies and authentication headers
  },
});

// Store userId => socketId map
const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (!userId) return;

  userSocketMap[userId] = socket.id;
  io.emit("onlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

// Utility to get socketId by userId
const getSocketId = (userId) => {
  return userSocketMap[userId];
};

export { io, app, server, getSocketId };
