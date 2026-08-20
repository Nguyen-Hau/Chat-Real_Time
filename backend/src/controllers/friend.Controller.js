import User from "../models/user.Model.js";
import Friend from "../models/friend.Model.js";
import FriendRequest from "../models/friendRequest.Model.js";

// Xử lý gửi(add) lời mời
export const addFriendRequest = async (req, res) => {
  try {
    const { to, message } = req.body;
    const from = req.user._id;

    if (from === to) {
      return res.status(400).json({
        message: "Không thể gửi lời mời cho chính mình!",
      });
    }
    // Ktra người được gửi lời mời có tồn tại không
    const userExists = await User.exists({ _id: to });
    if (!userExists) {
      return res.status(404).json({
        message: "Người dùng không tồn tại!",
      });
    }

    // Ktra đã là bạn bè hay gửi lời mời nào chưa
    let userA = from.toString();
    let userB = to.toString();
    if (userA > userB) {
      [userA, userB] = [userB, userA];
    }

    const [alreadyFriends, existingRequest] = await Promise.all([
      Friend.findOne({ UserA: userA, UserB: userB }),
      FriendRequest.findOne({
        $or: [
          { from, to },
          { from: to, to: from },
        ],
      }),
    ]);

    if (alreadyFriends) {
      return res.status(400).json({
        message: "Đã là bạn bè!",
      });
    }
    if (existingRequest) {
      return res.status(400).json({
        message: "Đã gửi lời mời trước đó!",
      });
    }

    // lưu lời mời
    const saveRequest = await FriendRequest.create({ from, to, message });
    // Thông báo gửi lời mời thành công
    return res.status(200).json({
      message: "Gửi lời mời thành công!",
      saveRequest,
    });
  } catch (error) {
    console.log("Lỗi khi gửi lời mời kết bạn: " + error);
    return res.status(500).json({
      message: "Lỗi hệ thống:" + error.message,
    });
  }
};

// Xử lý chấp nhận(accept) lời mời
export const acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user._id;

    // Tìm lời mời kết bạn
    const request = await FriendRequest.findOne({ _id: requestId });
    if (!request) {
      return res.status(404).json({
        message: "Không tìm thấy lời mời kết bạn!",
      });
    }

    // Ktra để không thể tự động chấp nhận lời
    if (request.to.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Bạn không có quyền chấp nhận lời mời này!",
      });
    }

    // Thêm quan hệ bạn bè
    await Friend.create({
      UserA: request.from,
      UserB: request.to,
    });

    // tìm đến id gửi lời mời và từ chối
    await FriendRequest.findByIdAndDelete({ _id: requestId });

    const from = await User.findById(request.from)
      .select("_id displayName avatarUrl")
      .lean();

    return res.status(200).json({
      message: "Chấp nhận lời mời kết bạn thành công!",
      newFriend: {
        _id: from?._id,
        displayName: from?.displayName,
        avatarUrl: from?.avatarUrl,
      },
    });
  } catch (error) {
    console.log("Lỗi khi chấp nhận lời mời kết bạn: ", error);
    return res.status(500).json({
      message: "Lỗi hệ thống:" + error.message,
    });
  }
};

// Xử lý từ chối(decline) lời mời
export const declineFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user._id;

    const request = await FriendRequest.findOne({ _id: requestId });
    if (!request) {
      return res.status(404).json({
        message: "Không tìm lời mời kết bạn!",
      });
    }

    if (request.to.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Bạn không có quyền từ chối lời mời này!",
      });
    }
    // Từ chối lời mời kết bạn
    await FriendRequest.findByIdAndDelete({ _id: requestId });

    return res.status(200).json({
      message: "Đã từ chối lời mời kết bạn!",
    });
  } catch (error) {
    console.log("Lỗi khi từ chối lời mời kết bạn: ", error);
    return res.status(500).json({
      message: "Lỗi hệ thống:" + error.message,
    });
  }
};

// Xử lý xóa(remove) kết bạn
export const removeFriend = async (req, res) => {
  try {
    const { friendId } = req.params;
    const userId = req.user._id;

    if (!friendId) {
      return res.status(404).json({
        message: "Thiếu ID người bạn cần hủy!",
      });
    }

    if (friendId === userId.toString()) {
      return res.status(400).json({
        message: "Không thể hủy kết bạn với chính mình!",
      });
    }

    let userA = userId.toString();
    let userB = friendId.toString();
    if (userA > userB) {
      [userA, userB] = [userB, userA];
    }
    const removeFriend = await Friend.findOneAndDelete({
      UserA: userA,
      UserB: userB,
    });

    if (!removeFriend) {
      return res.status(404).json({
        message: "Hai người chưa phải bạn bè!",
      });
    }
    return res.status(200).json({
      message: "Hủy kết bạn thành công!",
    });
  } catch (error) {
    console.log("Lỗi khi hủy kết bạn: ", error);
    return res.status(500).json({
      message: "Lỗi hệ thống:" + error.message,
    });
  }
};

// Xử lý việc lấy danh sách bạn bè TK
export const getAllFriend = async (req, res) => {
  try {
    const userId = req.user._id;

    const dataFields = "id username email displayName phone avatarUrl";
    const allFriends = await Friend.find({
      $or: [{ UserA: userId }, { UserB: userId }],
    })
      .populate("UserA", dataFields)
      .populate("UserB", dataFields)
      .lean();

    return res.status(200).json({
      message: "Danh sách bạn bè!",
      allFriends,
    });
  } catch (error) {
    console.log("Lỗi khi lấy danh sách bạn bè: ", error);
    return res.status(500).json({
      message: "Lỗi hệ thống:" + error.message,
    });
  }
};

//Lấy danh sách yêu cầu kết bạn
export const getFriendRequest = async (req, res) => {
  try {
    const userId = req.user._id;

    const dataFields = "id username displayName avatarUrl";
    const [send, received] = await Promise.all([
      FriendRequest.find({ from: userId }).populate("to", dataFields),
      FriendRequest.find({ to: userId }).populate("from", dataFields),
    ]);

    return res.status(200).json({ send, received });
  } catch (error) {
    console.log("Lỗi khi lấy danh sách yêu cầu kết bạn: ", error);
    return res.status(500).json({
      message: "Lỗi hệ thống:" + error.message,
    });
  }
};
