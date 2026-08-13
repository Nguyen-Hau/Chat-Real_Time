import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
import { connectionDB } from "./config/mongodb.js";
import authRoute from "./routers/auth.Routes.js";
import friendRoute from "./routers/friend.Routes.js";

const app = express();
app.use(cookieParser());

// B1. Cấu hình CORS trên Backend
// Cho phép Vite FE gọi API
app.use(
  cors({
    origin: "http://localhost:5173", // Cho phép Frontend Vite kết nối
    credentials: true, // cho phép trình duyệt gửi cookie, cần cho refreshToken
  }),
);

// middleware
app.use(express.json()); // giúp express hiểu và đọc được request.body dưới dạng JSON
app.use(cookieParser());

// public Router
app.use("/api/auth", authRoute);
app.use("/api/friends", friendRoute);

// private Router

const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  console.log("===================================");
  console.log(`Server bắt đầu trên cổng: ${PORT}`);
  console.log(`Link chạy thử:http://localhost:${PORT}`);
  console.log("===================================");
  await connectionDB();
});
