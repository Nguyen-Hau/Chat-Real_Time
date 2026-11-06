import express from "express";
import {
  addFriend,
  acceptFriendRequest,
  unFriend,
  declineFriendRequest,
  getAllFriends,
  getFriendRequest,
} from "../controllers/friend.Controller.js";

const router = express.Router();

// Gửi kết bạn
router.post("/request", addFriend);
// Chấp nhận kết bạn
router.post("/request/:requestId/accept", acceptFriendRequest);
// Từ chối kết bạn
router.post("/request/:requestId/decline", declineFriendRequest);
// Hủy kết bạn
router.delete("/:friendId/unfriend", unFriend);
// Lấy danh sách lời mời kết bạn
router.get("/request", getFriendRequest);
// Lấy danh sách bạn bè
router.get("/", getAllFriends);

export default router;
