import express from "express";
import {
  createConversation,
  deleteConversation,
  getConversations,
  getMessage,
  removeConversation,
} from "../controllers/conversation.Controller.js";
import { checkFriendship } from "../middleware/friend.middleware.js";

const router = express.Router();

router.post("/", checkFriendship, createConversation);
router.delete("/", deleteConversation);
router.get("/", getConversations);
router.delete("/:conversationId", removeConversation);
router.post("/:conversationId/message", getMessage);

export default router;
