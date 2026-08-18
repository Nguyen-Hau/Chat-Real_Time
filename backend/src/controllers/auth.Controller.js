import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/user.Model.js";
import Session from "../models/session.Model.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";

const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000; // 14 DAY

// Signup / Đăng ký
export const signup = async (req, res) => {
  try {
    const { username, password, email, firstName, lastName, phone } = req.body;

    if (!username || !password || !email || !firstName || !lastName || !phone) {
      return res.status(400).json({
        message: "Thông tin nhập bị thiếu. Vui lòng nhập lại!",
      });
    }

    // Ktra user ton tại chưa
    const user = await User.findOne({ username });
    if (user) {
      return res.status(401).json({
        message: "Tài khoản này đã tồn tại! Vui lòng kiểm tra lại",
      });
    }
    // Mã háo password (băm)
    const hashPass = await hashPassword(password);

    // tạo user mới
    await User.create({
      username,
      password: hashPass,
      email,
      displayName: `${lastName} ${firstName}`,
      phone,
    });
    // return
    return res.status(201).json({
      message: "Đăng ký thành công tài khoản!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi hệ thống: " + error.message,
    });
  }
};

// Signin / Đăng nhập
export const signin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if ((!username && !email) || !password) {
      return res.status(400).json({
        message: "Vui lòng nhập tài khoản hoặc mật khẩu!",
      });
    }
    // 1 . Kiểm tra username
    const user = await User.findOne({
      $or: [{ username: username }, { email: username }],
    });

    if (!user) {
      return res.status(404).json({
        message: "Tài khoản và mật khẩu không chính xác!",
      });
    }
    // Kiểm tra password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Tài khoản hoặc mật khẩu không chính xác!",
      });
    }

    // 2. Tạo AccessToken giới hạn 15m
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL },
    );

    // 3. Tạo RefreshToken giới hạn 14day sử dụng khi accessToken đã hệt hạn
    const refreshToken = crypto.randomBytes(64).toString("hex");

    // Tạo session mới để lưu RefreshToken
    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
    });

    // Trả refreshToken về Client qua cookie // Tạo cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // Ko thể truy cập bởi JVS
      secure: false, // Đảm bảo gửi qua https
      sameSite: "lax", // BE & FE chạy trên 2 domain khác nhau
      maxAge: REFRESH_TOKEN_TTL,
    });

    // 4.
    return res.status(200).json({
      message: "Đăng nhập thành công!",
      accessToken,
      user: {
        id: user._id || user.id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        phone: user.phone,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi hệ thống: " + error.message,
    });
  }
};

// Logout/ Xóa refreshToken
export const logout = async (req, res) => {
  try {
    // 1. lấy refreshToken từ cookie của resquest
    const refreshToken = req.cookies?.refreshToken;
    //2. Nếu có refreshToken trong database thì thực hiện delete
    if (refreshToken) {
      await Session.deleteOne({ refreshToken });
    }
    // 3. cũng delete refreshToken trên client
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    return res.status(200).json({ message: "Đăng xuất thành công" });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi hệ thống khi đăng xuất: " + error.message,
    });
  }
};

// Cấp lại Token
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Bạn chưa đăng nhập hoặc không tìm thấy Refresh Token!",
      });
    }

    // 2. Tìm Session trong Database
    const session = await Session.findOne({ refreshToken });

    if (!session || new Date(session.expiresAt).getTime() <= Date.now()) {
      return res.status(403).json({
        success: false,
        message:
          "Phiên đăng nhập không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại!",
      });
    }

    // 4. Nếu hợp lệ -> Tạo AccessToken mới (15m)
    const accessToken = jwt.sign(
      { userId: session.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL },
    );

    // 5. Trả AccessToken mới về cho Client
    return res.status(200).json({
      success: true,
      message: "Cấp lại AccessToken thành công!",
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Lỗi hệ thống: " + error.message,
    });
  }
};
