import mongoose from "../config/mongodb.js";

export const conversationSchema = new mongoose.Schema(
  {
    participant: {
      type: mongoose.Schema.Types.Object,
      ref: "User",
      required: true,
      trim: true,
      lowercase: true,
    },
    type: {
      type: String,
      enum: ["diret", "group"],
      required: true,
    },
    group: {
      name: string,
      createBy: {
        type: mongoose.Schema.Types.Object,
        ref: "User",
      },
    },
    lastMessage: {
      content: mongoose.Schema.Types.Object,
      sender: {
        type: mongoose.Schema.Types.Object,
        ref: "User",
      },
      createAt: { type: Data },
    },
  },
  {
    timestamp: true,
  },
);
