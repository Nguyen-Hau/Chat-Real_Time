import express from "express";
import {
  signup,
  signin,
  logout,
  refreshToken,
} from "../controllers/auth.Controller.js";

const router = express.Router();

// authRouter
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);

export default router;
