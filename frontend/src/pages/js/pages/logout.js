import { setToken } from "../axios.js";
import { authService } from "../services/auth.service.js";

document.addEventListener("click", async (envent) => {
  const logoutBtn = envent.target.closest("#logout-btn");

  if (logoutBtn) {
    try {
      // 1. Gửi request thông báo cho BE huỷ Cookie Refresh Token
      await authService.logout();
    } catch (error) {
      console.error("Lỗi khi gọi API logout:", error);
    } finally {
      // 2. Dọn dẹp sạch sẽ bộ nhớ ở Frontend
      setToken(null);
      localStorage.removeItem("currentUser");

      // 3. Chuyển về trang Đăng Nhập
      window.location.href = "login.html";
    }
  }
});
