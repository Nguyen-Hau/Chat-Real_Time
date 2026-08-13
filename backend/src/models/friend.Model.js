import mongoose from "mongoose";

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
    timestamps: true,
  },
);

export const friendRequestSchema = new mongoose.Schema(
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
  { timestamps: true },
);

const Friend = mongoose.model("Friend", friendSchema);
const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);

export default { Friend, FriendRequest };
