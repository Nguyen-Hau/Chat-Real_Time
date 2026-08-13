import express from "express";
import {
  addFriendRequest,
  acceptFriendRequest,
  cancelFriend,
  declineFriendRequest,
  getAllFriend,
  getFriendRequest,
} from "../controllers/friend.Controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/request", addFriendRequest);
router.post("/request/:requestId/accept", acceptFriendRequest);
router.post("/request/:requestId/decline", declineFriendRequest);
router.post("/request/:requestId/cancel", cancelFriend);
router.get("/", getAllFriend);
router.get("/request", getFriendRequest);

export default router;
