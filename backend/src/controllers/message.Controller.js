import Conversation from "../models/conversation.Model.js";
import Message from "../models/message.Model.js";
import { updateConversationAfterCreateMessage } from "../utils/messageHelper.js";

export const sendDirectMessage = async (req, res) => {
  try {
    const { recipientId, connent, conversationId } = req.body;
    const senderId = req.user._id;

    let conversation; // tạo biến hội thoại

    if (!connent) {
      return res.status(400).json({ message: "Thiếu nội dung!" });
    }

    if (conversationId) {
      conversation = await Conversation.findById({ _id: conversationId });
    }

    if (!conversation) {
      conversation = await Conversation.create({
        type: "direct",
        participants: [
          { userId: senderId, joindAt: new Date() },
          { userId: recipientId, joindAt: new Date() },
        ],
        lastMessageAt: new Date(),
        unreadCounts: new Map(),
      });
    }

    const message = await Message.create({
      conversationId: conversation._id,
      senderId,
      connent,
      imgUrl,
    });

    updateConversationAfterCreateMessage(conversation, message, senderId);

    await conversation.save();

    return res.status(200).json({ message });
  } catch (error) {
    console.error("Lỗi gửi nội dung:", error);
    return res.status(500).json({
      message: "Lỗi hệ thống:" + error.message,
    });
  }
};

export const sendGroupMessage = async (req, res) => {
  try {
  } catch (error) {}
};
