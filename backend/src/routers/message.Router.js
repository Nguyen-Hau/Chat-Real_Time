import express from "express";

import {
  removeMessage,
  sendDirectMessage,
  sendGroupMessage,
} from "../controllers/message.Controller.js";
import { checkFriendship } from "../middleware/friend.middleware.js";

const router = express.Router();

router.post("/direct", checkFriendship, sendDirectMessage);
router.post("/group", sendGroupMessage);
router.delete("/:messageId", removeMessage);

export default router;
