// Get getfile
export const profile = async (req, res) => {
  try {
    const user = req.userId;

    return res.status(200).json({
      message: "Lấy thông tin Profile thành công!",
      user,
    });
  } catch (error) {
    console.error("Lỗi khi gọi Profile: ", error);
    return res.status(500).json({
      message: "Lỗi lấy Profile:" + error.message,
    });
  }
};

// Lấy danh sách người dùng
export const idUser = async (req, res) => {};

// Sửa Người dùng
export const deleteUser = async (req, res) => {
  try {
  } catch (error) {}
};
