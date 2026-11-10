import Conversation from "../models/conversation.Model.js";
import Message from "../models/message.Model.js";

// tạo cuộc trò chuyện
export const createConversation = async (req, res) => {
  try {
    const { type, name, memberIds } = req.body;
    const userId = req.user._id;

    // ktra dữ liệu đầu vào
    if (
      !type ||
      (type == "group" && !name) ||
      !memberIds ||
      !Array.isArray(memberIds) ||
      memberIds.length === 0
    ) {
      return res.status(400).json({
        message: "Tên nhóm và danh sach thành viên là bắc buộc!",
      });
    }

    let conversation;

    // Trường hợp 1
    if (!type === "direct") {
      const participantId = memberIds;

      conversation = await Conversation.findOne({
        type: "direct",
        "participants.userId": { $all: [userId, participantId] },
      });

      if (!conversation) {
        conversation = new Conversation({
          type: "direct",
          participants: [{ userId }, { userId: participantId }],
          lastMessagAt: new Date(),
        });
      }
      await conversation.save();
    }

    // Tạo nhóm chat
    if ((type = "group")) {
      conversation = new Conversation({
        type: "group",
        participants: [{ user }, ...memberIds.map((id) => ({ userId: id }))],
        group: {
          name,
          createBy: userId,
        },
        lastMessagAt: new Date(),
      });
      await conversation.save();
    }

    if (!conversation) {
      return res.status(400).json({ message: "Conversation không hợp lệ!" });
    }

    await conversation.populate([
      { path: "participants.userId", select: "displayName avatarUrl" },
      { path: "seenBy", select: "displayName avatarUrl" },
      { path: "lastMessage.senderId", select: "displayName avatarUrl" },
    ]);

    return res.status(201).json({ conversation });
  } catch (error) {
    console.error("Lỗi khi tạo conversation", error);
    return res.status(500).json({ message: "Lỗi hệ thống" + error.message });
  }
};

export const deleteConversation = async (req, res) => {
  try {
  } catch (error) {}
};

// lấy cuộc trò chuyện
export const getConversations = async (req, res) => {
  try {
  } catch (error) {}
};

// Rời nhóm hoặc ẩn/xóa cuộc hội thoại.
export const removeConversation = async (req, res) => {
  try {
  } catch (error) {}
};

// lấy tin nhắn
export const getMessage = async (req, res) => {
  try {
  } catch (error) {}
};
