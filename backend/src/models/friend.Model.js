import mongoose from "mongoose";

const friendSchema = new mongoose.Schema(
  {
    userA: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userB: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

friendSchema.pre("save", function () {
  if (!this.userA || !this.userB) return;

  const a = this.userA.toString();
  const b = this.userB.toString();

  if (a > b) {
    this.userA = new mongoose.Types.ObjectId(b);
    this.userB = new mongoose.Types.ObjectId(a);
  }
});

// tạo index đọc nhất cho cặp userA và userB
friendSchema.index({ userA: 1, userB: 1 }, { unique: true });
const Friend = mongoose.model("Friend", friendSchema);

export default Friend;
