import mongoose from "mongoose";

// Lưu refresh vào database để quản lý riêng
const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    refreshToken: {
      type: String,
      required: true, // Bắt buộc phải có
      unique: true, // Độc nhất
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// cứ sau 14day sẽ lại xóa refreshToken
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Session = mongoose.model("session", sessionSchema);
export default Session;
