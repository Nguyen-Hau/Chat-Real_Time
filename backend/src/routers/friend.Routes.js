import express from "express";
import {
  addFriendRequest,
  acceptFriendRequest,
  removeFriend,
  declineFriendRequest,
  getAllFriend,
  getFriendRequest,
} from "../controllers/friend.Controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/request", authMiddleware, addFriendRequest);
router.post("/request/:requestId/accept", authMiddleware, acceptFriendRequest);
router.post(
  "/request/:requestId/decline",
  authMiddleware,
  declineFriendRequest,
);
// Lấy danh sách lời mời kết bạn
router.get("/request", authMiddleware, getFriendRequest);

// Lấy danh sách bạn bè
router.get("/", authMiddleware, getAllFriend);
// Hủy kết bạn
router.delete("/:friendId/remove", authMiddleware, removeFriend);

export default router;
