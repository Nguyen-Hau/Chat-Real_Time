import express from "express";
import { profile, deleteUser, idUser } from "../controllers/user.Controller.js";

const router = express.Router();

// userRouter
router.get("/profile", profile); // Lấy thông tin người dùng
router.get("/user", idUser); // Lấy danh sách người dùng
router.delete("/user/:id", deleteUser); // Xóa người dùng

export default router;
