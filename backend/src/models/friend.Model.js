import mongoose from "mongoose";

const friendSchema = new mongoose.Schema(
  {
    UserA: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    UserB: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

friendSchema.pre("save", function () {
  const a = this.UserA.toString();
  const b = this.UserB.toString();

  if (a > b) {
    this.UserA = new mongoose.Types.ObjectId(b);
    this.UserB = new mongoose.Types.ObjectId(a);
  }
});

friendSchema.index({ userAd: 1, userBd: 1 }, { unique: true });
const Friend = mongoose.model("Friend", friendSchema);

export default Friend;
