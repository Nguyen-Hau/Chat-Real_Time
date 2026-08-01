import { authService } from "../services/auth.service.js";

const signinForm = document.getElementById("signin-form");

signinForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
});
