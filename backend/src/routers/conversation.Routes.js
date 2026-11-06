import express from "express";
import {
  createConversation,
  getConversations,
  getMessage,
  removeMessage,
} from "../controllers/conversation.Controller";

const router = express.Router();

router.post("/", createConversation);
router.get("/", getConversations);
router.post("/:conversationId/message", getMessage);
router.delete("/removeMessage", removeMessage);

export default router;
