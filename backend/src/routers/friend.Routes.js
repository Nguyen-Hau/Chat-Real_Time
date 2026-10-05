import express from "express";
import {
  addFriend,
  acceptFriendRequest,
  unFriend,
  declineFriendRequest,
  getAllFriends,
  getFriendsRequest,
} from "../controllers/friend.Controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Gửi kết bạn
router.post("/request", authMiddleware, addFriend);
// Chấp nhận kết bạn
router.post("/request/:requestId/accept", authMiddleware, acceptFriendRequest);
// Từ chối kết bạn
router.post(
  "/request/:requestId/decline",
  authMiddleware,
  declineFriendRequest,
);
// Hủy kết bạn
router.delete("/:friendId/unfriend", authMiddleware, unFriend);

// Lấy danh sách lời mời kết bạn
router.get("/request", authMiddleware, getFriendsRequest);
// Lấy danh sách bạn bè
router.get("/", authMiddleware, getAllFriends);

export default router;
