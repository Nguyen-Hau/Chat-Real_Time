import express from "express";
import {
  verifyRefreshToken,
  requireRoles,
} from "../middleware/auth.middleware.js";
import {
  signup,
  signin,
  logout,
  refresh,
} from "../controllers/auth.Controller.js";

import { profile } from "../controllers/user.Controller.js";

const router = express.Router();

// authRouter
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.post("/refresh", refresh);

// userRouter
router.get("/profile", verifyRefreshToken, profile);

export default router;
