import Conversation from "../models/conversation.Model.js";
import Friend from "../models/friend.Model.js";

const pair = (a, b) => (a < b ? [a, b] : [b, a]);

export const checkFriendship = async (req, res, next) => {
  try {
    const me = req.user._id.toString();

    const recipientId = req.body?.recipientId ?? null;

    if (!recipientId) {
      return res.status(400).json({ message: "Cần cung cấp recipientId!" });
    }

    if (recipientId) {
      const [userA, userB] = pair(me, recipientId);

      const isFriend = await Friend.findOne({ userA, userB });

      if (!isFriend) {
        return res.status(403).json({
          message: "Bạn chưa kết bạn với người này!",
        });
      }

      return next();
    }

    // toro: chat nhóm
  } catch (error) {
    console.error("Lỗi xảy ra khi checkFriendship: ", error);
    return res.status(500).json({
      message: "Lỗi hệ thống: " + error,
    });
  }
};
