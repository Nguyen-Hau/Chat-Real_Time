import jwt from "jsonwebtoken";

export const verifyRefreshToken = async (request, response, next) => {
  // Lấy token từ header Authorization
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return response.status(401).json({
      message: "Token không hợp lệ hoặc đã hết hạn!",
    });
  }

  // Cắt chuỗi để lấy token sau chữ 'Bearer '
  const token = authHeader.split(" ")[1];

  try {
    // Giải mã và verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ||
        "khoa_luan_tot_nghiep_2026_nguyen_phuc_hau_2003",
    );

    // Gán userId vào request để Controller lấy ra sử dụng
    request.userId = decoded.id;

    // Tiếp tục chuyển tiếp cho controller xử lý
    next();
  } catch (error) {
    return response.status(403).json({
      message: "Token không hợp lệ hoặc đã hết hạn!",
    });
  }
};

export const requireRoles = async (request, response) => {};
