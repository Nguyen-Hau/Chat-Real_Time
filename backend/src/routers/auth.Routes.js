import express from "express";
import { verifyAccessToken } from "../middleware/auth.middleware.js";
import {
  signup,
  signin,
  logout,
  refreshToken,
} from "../controllers/auth.Controller.js";
import { deleteUser, profile, idUser } from "../controllers/user.Controller.js";

const router = express.Router();

// authRouter
router.post("/signup", signup); // Thêm thông tin người dùng
router.post("/signin", signin);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);

// userRouter
router.get("/profile", verifyAccessToken, profile); // Lấy thông tin người dùng
router.get("/user", verifyAccessToken, idUser); // Lấy danh sách người dùng
router.delete("/user/:id", verifyAccessToken, deleteUser); // Xóa người dùng

export default router;
