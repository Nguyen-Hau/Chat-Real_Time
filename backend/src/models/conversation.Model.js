import mongoose from "mongoose";

// người tham gia
const participantSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false, // Ko tạo id riêng cho từng phần tử
  },
);

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    _id: false,
  },
);

// Tin nhắn cuối cùng
const lastMessageSchema = new mongoose.Schema(
  {
    _id: { type: String },
    content: {
      type: String,
      default: null,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: null,
    },
  },
  {
    _id: false,
  },
);

// Cuộc hội thoại
const conversationSchame = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["direct", "group"],
      trim: true,
    },
    participants: {
      type: participantSchema,
      required: true,
    },
    group: {
      type: groupSchema,
    },
    lastMessage: {
      type: lastMessageSchema,
      default: null,
    },

    lastMessageAt: {
      type: Date,
    },
    seenBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    unreadCounts: {
      type: Map,
      of: Number,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

conversationSchame.index({ "participant.userId": 1, lastMessageAt: -1 });

const Conversation = mongoose.model("Conversation", conversationSchame);
export default Conversation;
