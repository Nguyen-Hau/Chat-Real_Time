import User from "../models/user.Model.js";
import Friend from "../models/friend.Model.js";
import FriendRequest from "../models/friendRequest.Model.js";

// Xử lý gửi(add) lời mời
export const addFriendRequest = async (request, response) => {
  try {
  } catch (error) {
    console.log("Lỗi khi gửi lời mời kết bạn: " + error);
    return response.status(500).json({
      message: "Lỗi hệ thống:" + error.message,
    });
  }
};

// Xử lý chấp nhận(accept) lời mời
export const acceptFriendRequest = async (request, response) => {
  try {
    const { requestId } = request.params;
    const userId = request.user._id;

    // Tìm lời mời kết bạn
    const request = await FriendRequest.findOne({ requestId });
    if (!request) {
      return response.status(404).json({
        message: "Không tìm thấy lời mời kết bạn!",
      });
    }

    //
    if (request.to.toString() !== userId) {
      return response.status(403).json({
        message: "Bạn không có quyền chấp nhận lời mời!",
      });
    }

    const friend = await Friend.create({
      userA: request.from,
      userB: request.to,
    });

    await FriendRequest.findByIdAndDelete({ requestId });

    const from = await User.findById(request.from)
      .select("_id displayName avatarUrl")
      .lean();

    return response.status(200).json({
      message: "Chấp nhận lời mời kết bạn thành công!",
      newFriend: {
        _id: from?._id,
        displayName: from?.displayName,
        avatarUrl: from?.avatarUrl,
      },
    });
  } catch (error) {
    console.log("Lỗi khi chấp nhận lời mời kết bạn: ", error);
    return response.status(500).json({
      message: "Lỗi hệ thống:" + error.message,
    });
  }
};

// Xử lý từ chối(decline) lời mời
export const declineFriendRequest = async (request, response) => {
  try {
  } catch (error) {
    console.log("Lỗi khi từ chối lời mời kết bạn: ", error);
    return response.status(500).json({
      message: "Lỗi hệ thống:" + error.message,
    });
  }
};

// Xử lý hủy(cancel) kết bạn
export const cancelFriend = async (request, response) => {
  try {
    const requestId = res;
  } catch (error) {
    console.log("Lỗi khi hủy kết bạn: ", error);
    return response.status(500).json({
      message: "Lỗi hệ thống:" + error.message,
    });
  }
};

// Xử lý việc lấy danh sách bạn bè TK
export const getAllFriend = async (request, response) => {
  try {
    const requestId = res;
  } catch (error) {
    console.log("Lỗi khi lấy danh sách bạn bè: ", error);
    return response.status(500).json({
      message: "Lỗi hệ thống:" + error.message,
    });
  }
};

//Lấy danh sách yêu cầu kết bạn
export const getFriendRequest = async (request, response) => {
  try {
    const requestId = res;
  } catch (error) {
    console.log("Lỗi khi lấy danh sách yêu cầu kết bạn: ", error);
    return response.status(500).json({
      message: "Lỗi hệ thống:" + error.message,
    });
  }
};
