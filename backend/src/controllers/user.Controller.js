// Get getfile
export const profile = async (request, response) => {
  try {
    const user = request.userId;

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
