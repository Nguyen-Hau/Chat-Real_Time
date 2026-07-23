import express from "express";
import {
  signup,
  signin,
  logout,
  refresh,
} from "../controllers/auth.Controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.post("/refresh", refresh);

export default router;
