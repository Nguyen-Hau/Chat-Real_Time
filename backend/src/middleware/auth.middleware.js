import jwt from "jsonwebtoken";
import User from "../models/user.Model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // Lấy token từ header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        message: "Token không hợp lệ hoặc đã hết hạn!",
      });
    }

    // Cắt chuỗi để lấy token sau chữ 'Bearer '
    const token = authHeader.split(" ")[1];

    // Giải mã và verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "Không tìm thấy thông tin người dùng!",
      });
    }

    // Gán userId vào request để Controller lấy ra sử dụng
    req.user = user;

    // Tiếp tục chuyển tiếp cho controller xử lý
    next();
  } catch (error) {
    if (error.name !== "TokenExpiredError") {
      console.error("Lỗi xác thực Token:", error.message);
    }
    // Thông báo Token hết hạn
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token đã hết hạn!",
      });
    }
    // Thông báo Token không hợp lệ
    return res.status(403).json({
      message: "Token không hợp lệ!",
    });
  }
};

// export const requireRoles = async (request, response) => {};
