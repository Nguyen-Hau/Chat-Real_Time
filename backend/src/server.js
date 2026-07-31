import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import { connectionDB } from "./config/mongodb.js";
import authRoute from "./routers/auth.Routes.js";

const app = express();

// middleware
app.use(express.json()); // giúp express hiểu và đọc được request.body dưới dạng JSON
app.use(cookieParser());
// public Router
app.use("/api/auth", authRoute);

// private Router

const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  console.log("===================================");
  console.log(`Server bắt đầu trên cổng: ${PORT}`);
  console.log(`Link chạy thử:http://localhost:${PORT}`);
  console.log("===================================");
  await connectionDB();
});
