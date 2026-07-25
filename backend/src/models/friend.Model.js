import mongoose from "../config/mongodb.js";

export const friendResquestSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
      lowercase: true,
    },
    to: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamp: true },
);

export const friendSchema = new mongoose.Schema(
  {
    UserA: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      trim: true,
      lowercase: true,
    },
    UserB: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamp: true,
  },
);
