import mongoose from "mongoose";

export const conversationSchema = new mongoose.Schema(
  {
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
      lowercase: true,
    },
    type: {
      type: String,
      enum: ["direct", "group"],
      required: true,
    },
    group: {
      name: String,
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    lastMessage: {
      content: mongoose.Schema.Types.ObjectId,
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      createdAt: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  },
);
