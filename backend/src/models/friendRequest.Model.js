import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema(
  {
    from: {
      // id của người gửi kết bạn
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      // id người nhận
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      // tin nhắn gửi kèn theo lời mời
      type: String,
      maxlength: 300,
    },
  },
  { timestamps: true },
);

// đảm bảo from, to này là duy nhất
friendRequestSchema.index({ from: 1, to: 1 }, { unique: true });
// truy vấn nhanh tất cả lời mời đã gửi
friendRequestSchema.index({ from: 1 });
friendRequestSchema.index({ to: 1 });

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);
export default FriendRequest;
