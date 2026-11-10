import Conversation from "../models/conversation.Model.js";
import Message from "../models/message.Model.js";
import { updateConversationAfterCreateMessage } from "../utils/messageHelper.js";
import {
  createConversation,
  getConversations,
  removeMessage,
} from "../controllers/conversation.Controller.js";

// Thiết kế giao tiếp 1-1
export const sendDirectMessage = async (req, res) => {
  try {
    const { recipientId, content, conversationId } = req.body;
    const senderId = req.user._id; // ID người gửi

    let conversation; // tạo biến hội thoại

    if (!content) {
      return res.status(400).json({ message: "Thiếu nội dung!" });
    }

    // Tìm cuộc hội thoại với Id trong Cơ sở Dữ liệu
    if (conversationId) {
      conversation = await Conversation.findById({ _id: conversationId });
    }

    // Nếu khôg có, tạo 1 cuộc hội thoại
    if (!conversation) {
      conversation = await Conversation.create({
        type: "direct", //
        participants: [
          { userId: senderId, joinedAt: new Date() },
          { userId: recipientId, joinedAt: new Date() },
        ],
        lastMessageAt: new Date(),
        unreadCounts: new Map(), // Số lượng tin nhắn chưa đọc
      });
    }

    // Tạo tin nhắn
    const message = await Message.create({
      conversationId: conversation._id,
      senderId,
      content,
    });

    updateConversationAfterCreateMessage(conversation, message, senderId);

    // lưu cuộc hội thoại
    await conversation.save();

    return res.status(200).json({ message });
  } catch (error) {
    console.error("Lỗi xảy ra khi gửi tin nhắn trực tiếp:", error);
    return res.status(500).json({ message: "Lỗi hệ thống:" + error.message });
  }
};

// Thiết kế giao tiếp nhóm
export const sendGroupMessage = async (req, res) => {
  try {
    const { recipientId, content, conversationId } = req.body;
    const senderId = req.user._id;

    if (!content) {
      return res.status(400).json({ message: "Thiếu nội dung!" });
    }

    if (conversationId) {
      conversation = await Conversation.findById({ _id: conversationId });
    }
  } catch (error) {
    console.error("Lỗi gửi nội dung", error);
    return res.status(500).json({
      message: "Lỗi hệ thống: " + error.message,
    });
  }
};

export const removeMessage = async (req, res) => {};
