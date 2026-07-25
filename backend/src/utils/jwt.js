import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id || user.id, username: user.username, email: user.email },
    process.env.JWT_SECRET || "khoa_luan_tot_nghiep_2026_nguyen_phuc_hau_2003",
    { expiresIn: "15m" },
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET || "khoa_luan_tot_nghiep_2026_nguyen_phuc_hau_2003",
    { expiresIn: "1d" },
  );
};
