import jwt from "jsonwebtoken";

export const geneteraAccessToken = (user) => {
  return jwt.sign(
    { user: user.id, user: user.username, user: user.email },
    process.env.JWT_SECRET || khoa_luan_tot_nghiep_2026_nguyen_phuc_hau_2003,
    { expiresIn: "15m" },
  );
};

export const geneteraRefreshToken = (user) => {
  return jwt.sign(
    { user: user.id },
    process.env.JWT_SECRET || khoa_luan_tot_nghiep_2026_nguyen_phuc_hau_2003,
    { expiresId: "1d" },
  );
};

export const verifyRefreshToken = (token) => {
  return jwt.sign(
    token,
    process.env.JWT_SECRET || khoa_luan_tot_nghiep_2026_nguyen_phuc_hau_2003,
  );
};
