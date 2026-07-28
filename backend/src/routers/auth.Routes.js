import express from "express";
import {
  verifyRefreshToken,
  requireRoles,
} from "../middleware/auth.middleware.js";
import { signup, signin, logout } from "../controllers/auth.Controller.js";
import { deleteUser, profile, idUser } from "../controllers/user.Controller.js";

const router = express.Router();

// authRouter
router.post("/signup", signup); // Thêm thông tin người dùng
router.post("/signin", signin);
router.post("/logout", logout);

// userRouter
router.get("/profile", verifyRefreshToken, profile); // Lấy thông tin người dùng
router.get("/user", verifyRefreshToken, idUser); // Lấy danh sách người dùng
router.delete("/user/:id", verifyRefreshToken, deleteUser); // Xóa người dùng

export default router;
