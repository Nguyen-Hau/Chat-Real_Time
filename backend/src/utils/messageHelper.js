export const updateConversationAfterCreateMessage = (
  conversation, // đối tượng cuộc trò chuyện
  message, // Tin nhắn vừa đc tạo trong database
  senderId, // Id người gửi tin nhắn
) => {
  conversation.set({
    seenBy: [], // danh sách người đọc nếu là nhóm - người đc nếu là 1-1
    lastMessageAt: message.createdAt, // cập nhật tgian tạo tin nhắn mới nhất
    // chứa các tt cần thiết về tin nhắn
    lastMessage: {
      _id: message._id, // Id tin nhắn
      senderId, // Id người gửi
      connent: message.connect, // Nội dung tin nhắn
      createdAt: message.createAt, // Tg tạo tin nhắn
    },
  });

  conversation.participants.forEach((p) => {
    const memberId = p.userId.toString();
    const isSender = memberId === senderId.toString();
    const prevCount = conversation.unreadCounts.get(memberId) || 0;
    conversation.unreadCounts.set(memberId, isSender ? 0 : prevCount + 1);
  });
};
