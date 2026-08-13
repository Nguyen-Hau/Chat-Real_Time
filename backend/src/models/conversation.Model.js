import mongoose from "mongoose";

// người tham gia
const participantSchema = new mongoose.Schema(
  {
    // Thông tin thanh viên
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Ngày tham gia
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
    // Nội dung
    content: {
      type: String,
      default: null,
    },
    // Người gửi
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // Được tạo lúc
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
    // Kiểu
    type: {
      type: String,
      enum: ["direct", "group"],
      trim: true,
    },
    // người tham gia
    participants: {
      type: participantSchema,
      required: true,
    },
    // Nhóm
    group: {
      type: groupSchema,
    },
    // tin nhắn cuối cùng
    lastMessage: {
      type: lastMessageSchema,
      default: null,
    },
    //
    lastMessageAt: {
      type: Date,
    },
    // Được xem bởi
    seenBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // Số lượng tin chưa đọc
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
