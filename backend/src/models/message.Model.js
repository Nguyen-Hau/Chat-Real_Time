import mongoose from "mongoose";

export const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true, // Bắt buộc phải có
      index: true, // Tối ưu tốc độ truy vấn khi truyền tin nhắn
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      trim: true,
    },
    imgUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

messageSchema.index({ conversationId: 1 }, { createdAt: -1 });

const Message = mongoose.model("Message", messageSchema);
export default Message;
