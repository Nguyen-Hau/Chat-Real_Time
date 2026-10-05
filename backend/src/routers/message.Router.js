import express from "express";

import {
  sendDirectMessage,
  sendGroupMessage,
  removeMessage,
} from "../controllers/message.Controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/direct", sendDirectMessage);
router.post("/group", sendGroupMessage);
router.delete("/removeMessage", authMiddleware, removeMessage);

export default router;
