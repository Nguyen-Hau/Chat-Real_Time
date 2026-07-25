import mongoose from "../config/mongodb.js";

export const messageSchema = new mongoose.Schema(
  {},
  {
    timestamp: true,
  },
);
