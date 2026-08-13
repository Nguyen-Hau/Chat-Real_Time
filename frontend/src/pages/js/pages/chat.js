import "./logout.js";
import { authService } from "../services/auth.service.js";
import { setToken, getToken } from "../axios.js";

// Hàm khởi tạo ứng dụng Chat
async function initChatApp() {
  try {
    // 1. Âm thầm xin lại AccessToken mới bằng HttpOnly Cookie
    const response = await authService.refreshToken();
    const newAccessToken = response.data.accessToken;
    // 2. Nạp AccessToken vào bô nhớ Ram Tạm thời inMemory
    setToken(newAccessToken);
    console.log("Đã nhập thành công AccessToken mới vào RAM!");

    //3.
  } catch (error) {
    // Thông báo lỗi đăng nhập vào Acc
    console.error("Phiên đăng nhập hết hạn hoặc chưa đăng nhập: ", error);

    // 2. Dọn dẹp sạch sẽ bộ nhớ ở Frontend
    setToken(null);
    localStorage.removeItem("currentUser");

    alert("Vui lòng đăng nhập để tiếp tục!");
    window.location.href = "login.html"; // Chuyển về trang đăng nhập nếu login ko thành
  }
}

document.addEventListener("DOMContentLoaded", initChatApp);
