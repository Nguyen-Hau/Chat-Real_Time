import { authService } from "../services/auth.service.js";
import { setToken, getToken } from "../config";

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
    console.error("Phiên đăng nhập hết hạn hoặc chưa đăng nhập: ", error);
    alert("Vui lòng đăng nhập để tiếp tục!");
    window.location.href = "index.html"; // Chuyển về trang đăng nhập nếu gặp các trường hợp
  }
}

document.addEventListener("DOMContentLoaded", initChatApp);
