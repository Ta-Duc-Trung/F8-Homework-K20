import "../style.css";
import { auth, ApiError, isLoggedIn, redirectIfLoggedIn } from "../api.js";
import { setFieldError, clearFieldErrors, setButtonLoading, applyServerFieldErrors } from "../ui.js";

redirectIfLoggedIn();

const form = document.getElementById("register-form");
const formError = document.getElementById("form-error");

function validate(v) {
  const errors = {};

  if (!v.username) errors.username = "Vui lòng nhập tên đăng nhập.";
  else if (!/^[a-zA-Z0-9_]{3,30}$/.test(v.username))
    errors.username = "3–30 ký tự, chỉ gồm chữ không dấu, số và dấu _.";

  if (!v.display_name) errors.display_name = "Vui lòng nhập tên hiển thị.";

  if (!v.email) errors.email = "Vui lòng nhập email.";
  else if (!/^\S+@\S+\.\S+$/.test(v.email)) errors.email = "Email không hợp lệ.";

  if (!v.password) errors.password = "Vui lòng nhập mật khẩu.";
  else if (v.password.length < 8) errors.password = "Mật khẩu cần ít nhất 8 ký tự.";
  else if (!/[A-Z]/.test(v.password) || !/[a-z]/.test(v.password) || !/\d/.test(v.password))
    errors.password = "Cần có ít nhất 1 chữ hoa, 1 chữ thường và 1 số.";

  if (v.confirm_password !== v.password) errors.confirm_password = "Mật khẩu nhập lại không khớp.";

  Object.entries(errors).forEach(([field, msg]) => setFieldError(form, field, msg));
  return Object.keys(errors).length === 0;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearFieldErrors(form);
  formError.classList.add("hidden");

  const values = {
    username: form.username.value.trim(),
    display_name: form.display_name.value.trim(),
    email: form.email.value.trim(),
    password: form.password.value,
    confirm_password: form.confirm_password.value,
    country: form.country.value.trim(),
    bio: form.bio.value.trim(),
  };
  if (!validate(values)) return;

  const { confirm_password, ...payload } = values;

  const button = form.querySelector("button[type=submit]");
  setButtonLoading(button, true, "Đang tạo tài khoản...");

  try {
    await auth.register(payload);

    if (!isLoggedIn()) await auth.login(payload.email, payload.password);
    window.location.href = "/index.html";
  } catch (error) {
    formError.textContent =
      error instanceof ApiError
        ? error.message
        : "Không kết nối được máy chủ. Kiểm tra mạng và thử lại.";
    formError.classList.remove("hidden");
    applyServerFieldErrors(form, error);
    setButtonLoading(button, false);
  }
});