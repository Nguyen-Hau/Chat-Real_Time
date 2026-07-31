import User from "../models/user.Model.js";

// Get getfile
export const profile = async (request, response) => {
  try {
    const userId = request.userId;

    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return response.status(400).json({
        message: "Không tìm thấy thông tin người dùng!",
      });
    }

    return response.status(200).json({
      message: "Lấy thông tin Profile thành công!",
      user,
    });
  } catch (error) {
    return response.status(500).json({
      message: "Lỗi lấy Profile:" + error.message,
    });
  }
};

// Lấy danh sách người dùng
export const idUser = async (request, response) => {};

// Sửa Người dùng
export const deleteUser = async (request, response) => {
  try {
  } catch (error) {}
};
