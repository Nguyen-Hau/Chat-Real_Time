import express from "express";

import {
  sendDirectMessage,
  sendGroupMessage,
} from "../controllers/message.Controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/direct", sendDirectMessage);
router.post("/group", sendGroupMessage);

export default router;
