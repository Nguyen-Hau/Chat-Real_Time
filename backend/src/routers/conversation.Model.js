import express from "express";
import {
  createConversation,
  getConversations,
  getMessage,
} from "../controllers/conversation.Controller";

const router = express.Router();

router.post("/", createConversation);
router.get("/", getConversations);
router.post("/:conversationId/message", getMessage);

export default router;
