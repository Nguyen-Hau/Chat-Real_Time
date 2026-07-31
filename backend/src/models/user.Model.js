import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String, // Kiểu dữ liệu
      required: true, // Bắt buộc phải có
      unique: true, // Độc nhất
      trim: true, // Xóa khoảng trắng trước sau dữu liệu
      lowercase: true, // dữ liệu viết thường
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Doc nhat
      trim: true,
      lowercase: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String, // Link CDN de hien thi hinh
    },
    avatar: {
      type: String, // Cloudinary public_id de delete image
    },
    bio: {
      type: String,
      maxlength: 500, // do dai bio 500 ky tu
    },
    phone: {
      type: String,
      sparse: true, // cho phep null, neu co khong duoc trung
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
export default User;