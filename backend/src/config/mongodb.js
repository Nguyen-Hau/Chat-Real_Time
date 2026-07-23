import mongoose from "mongoose";

export const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("=== Kết nối cơ sở dữ liệu MongoDB! ===");
  } catch (error) {
    console.log("Kết nối thất bại: ", error.message);
    process.exit(1);
  }
};
