export const updateConversationAfterCreateMessage = (
  conversation,
  message,
  senderId,
) => {
  conversation.set({
    seenBy: [],
    lastMessageAt: message.createdAt,
    lastMessage: {
      _id: message._id,
      connect: message.connect,
      senderId,
      createAt: message.createAt,
    },
  });

  conversation.participan.array.forEach((p) => {
    const memberId = p.userId.toString();
    const isSebder = memberId === senderId.toString();
    const prevCount = conversation.unreadCounts.get(memberId) || 0;
    conversation.unreadCounts.get(memberId, isSebder ? 0 : prevCount + 1);
  });
};
