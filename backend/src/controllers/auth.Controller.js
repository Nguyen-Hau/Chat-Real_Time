import User from "../models/user.Model.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { geneteraAccessToken, geneteraRefreshToken } from "../utils/jwt.js";

export const signup = async (request, response) => {
  try {
    const { username, password, email, firstName, lastName } = request.body;
    if (!username || !password || !email || !firstName || !lastName) {
      return response.status(400).json({
        message: "Thông tin không chính xác. Vui lòng nhập lại!",
      });
    }

    // Ktra user ton tại chưa
    const duplicate = await User.findOne({ username });
    if (duplicate) {
      return response.status(401).json({
        message: "Tài khoản này đã tồn tại! Vui lòng kiểm tra lại",
      });
    }
    // Mã háo password (băm)
    const hashPass = await hashPassword(password);

    // tạo user mới
    await User.create({
      username,
      hashPassword: hashPass,
      email,
      displayName: `${firstName} ${lastName}`,
    });
    // return
    return response.status(200).json({
      message: "Đăng ký thành công tài khoản!",
    });
  } catch (error) {
    return response.status(500).json({
      message: "Lỗi hệ thống: " + error.message,
    });
  }
};

export const signin = async (request, response) => {
  try {
    const { username, password } = request.body;
    if (!username || !password) {
      return response
        .status(400)
        .json({ message: "Vui lòng nhập tài khoản hoặc mật khẩu!" });
    }
    // Kiểm tra username
    const user = await User.findOne({ username });
    if (!user) {
      return response.status(404).json({
        message: "Tài khoản và mật khẩu không chính xác!",
      });
    }
    // Kiểm tra password
    const isMatch = await comparePassword(password, user.hashPassword);
    if (!isMatch) {
      return response.status(400).json({
        message: "Tài khoản hoặc mật khẩu không chính xác!",
      });
    }

    const token = await geneteraAccessToken(user);

    return response.status(200).json({
      message: "Đăng nhập thành công!",
      token,
      user: {
        id: user._id || user.id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        phone: user.phone,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: "Lỗi hệ thống: " + error.message,
    });
  }
};

export const logout = async (request, response) => {};

export const refresh = async (request, response) => {};
