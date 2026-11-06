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
    // Thêm thông tin cho nhóm, ảnh đại diện(ảnh nền)
    groupIMG: {
      type: String,
    },
    groupInfor: {
      type: String,
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
      required: true,
    },

    participants: {
      type: [participantSchema],
      required: true,
    },

    group: {
      type: groupSchema,
    },

    lastMessage: {
      type: lastMessageSchema,
      default: null,
    },
    // lưu tg mess cuối trong hội thoại
    lastMessageAt: {
      type: Date,
    },
    // ds trường ai đã đọc tin nhắn
    seenBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    unreadCounts: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

conversationSchame.index({ "participant.userId": 1, lastMessageAt: -1 });

const Conversation = mongoose.model("Conversation", conversationSchame);
export default Conversation;
