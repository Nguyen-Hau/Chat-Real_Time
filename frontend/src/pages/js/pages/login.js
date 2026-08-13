import { getToken, setToken } from "../axios.js";
import { authService } from "../services/auth.service.js";

// 0. Tự động chuyển hướng sang chat.html nếu đã đăng nhập từ trước
const currentUser = localStorage.getItem("currentUser");
if (currentUser) {
  window.location.href = "chat.html";
}

const showToSignin = document.getElementById("show-to-signin");
const showToSignup = document.getElementById("show-to-signup");
const signinForm = document.getElementById("signin-form");
const signupForm = document.getElementById("signup-form");

// 2. Chuyển đổi qua lại giữa Form Đăng Nhập và Đăng Ký
showToSignup.addEventListener("click", (event) => {
  event.preventDefault();
  signinForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
});

showToSignin.addEventListener("click", (event) => {
  event.preventDefault();
  signupForm.classList.add("hidden");
  signinForm.classList.remove("hidden");
});

// 3. Hàm xóa hiển thị lỗi
function cleanError(inputElement) {
  const formGroup = inputElement.parentElement;
  formGroup.classList.remove("invalid");
  const errorElement = formGroup.querySelector(".form-message");

  if (errorElement) {
    errorElement.innerText = "";
  }
}

// 4.Xử lý Submit Form Đăng Nhập
signinForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = document.getElementById("signin-username").value;
  const password = document.getElementById("signin-password").value;

  try {
    const response = await authService.signin(username, password);
    const { accessToken, token, user } = response.data;
    const finalToken = accessToken || token;

    if (finalToken) {
      setToken(finalToken);

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
      alert("Đăng nhập thành công!");

      window.location.href = "chat.html";
    }
  } catch (error) {
    console.error("Lỗi đăng nhập: ", error);
    const message =
      error.response?.data?.message || "Đăng nhập thất bại! Vui lòng thử lại!";
    alert(message);
  }
});

// 3. Xử lý Submit Form Đăng Ký
signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const firstName = document.getElementById("signup-firstname").value;
  const lastName = document.getElementById("signup-lastname").value;
  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const phone = document.getElementById("signup-phone").value;
  const password = document.getElementById("signup-password").value;
  const passwordConfirm = document.getElementById(
    "signup-password-confirm",
  ).value;

  if (password !== passwordConfirm) {
    showError(
      document.getElementById("signup-password-confirm"),
      "Mật khẩu xác nhận không khớp!",
    );
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
    const message =
      error.response?.data?.message || "Đăng ký thất bại! Vui lòng thử lại!";
    alert(message);
  }
});

// Xóa lỗi khi người dùng bắt đầu nhập lại dữ liệu
const allInput = document.querySelectorAll("input");
allInput.forEach((input) => {
  input.addEventListener("input", () => {
    cleanError(input);
  });
});
