import { authService } from "../services/auth.service.js";

const showToSignin = document.getElementById("show-to-signin");
const showToSignup = document.getElementById("show-to-signup");
const signinForm = document.getElementById("signin-form");
const signupForm = document.getElementById("signup-form");
const authTitle = document.getElementById("auth-title");
const authSubtitle = document.getElementById("auth-subtitle");

// 1. Chuyển đổi qua lại giữa Form Đăng Nhập và Đăng Ký
showToSignup.addEventListener("click", (event) => {
  event.preventDefault();
  signinForm.style.display = "none";
  signupForm.style.display = "block";

  if (authTitle) {
    authTitle.innerText = "Tạo tài khoản mới";
  }

  if (authSubtitle) {
    authSubtitle.innerText = "Đăng ký để bắt đầu trò chuyện";
  }
});

showToSignin.addEventListener("click", (event) => {
  event.preventDefault();
  signupForm.style.display = "none";
  signinForm.style.display = "block";
});

// 2. Xử lý Submit Form Đăng Nhập
signinForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await authService.signin(username, password);
    const { accessToken, token, user } = response.data;
    const finalToken = accessToken || token;

    if (finalToken) {
      localStorage.setItem("accessToken", finalToken);

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
      alert("Đăng nhập thành công!");

      window.location.href = "chat.html";
    }
  } catch (error) {
    console.error("Lỗi đăng nhập: ", error);
  }
});

// 3. Xử lý Submit Form Đăng Ký
signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = document.getElementById("signup-username").value;
  const firstName = document.getElementById("signup-firstname").value;
  const lastName = document.getElementById("signup-lastname").value;
  const email = document.getElementById("signup-email").value;
  const phone = document.getElementById("signup-phone").value;
  const password = document.getElementById("signup-password").value;
  const passwordConfirm = document.getElementById(
    "signup-password-confirm",
  ).value;

  if (password !== passwordConfirm) {
    alert("Mật khẩu xác nhận không khớp!");
    return;
  }

  try {
    await authService.signup(
      username,
      password,
      email,
      firstName,
      lastName,
      phone,
    );

    alert("Đăng ký tài khoản thành công! Vui lòng đăng nhập.");

    showToSignin.click();
  } catch (error) {
    console.error("Lỗi đăng ký: ", error);
  }
});
