import User from "../models/user.Model.js";
import Friend from "../models/friend.Model.js";
import FriendRequest from "../models/friendRequest.Model.js";

// Xử lý gửi(add) lời mời
export const addFriendRequest = async (request, response) => {
  try {
    const requestId = res;
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
    const requestId = res;
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
    const requestId = res;
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

//Lấy danh sách yeu cầu kết bạn
export const getFriendRequest = async (request, response) => {
  try {
    const requestId = res;
  } catch (error) {
    console.log("Lỗi khi lấy danh sách yeu cầu kết bạn: ", error);
    return response.status(500).json({
      message: "Lỗi hệ thống:" + error.message,
    });
  }
};
