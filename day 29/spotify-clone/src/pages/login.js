import "../style.css";
import { auth, ApiError, redirectIfLoggedIn } from "../api.js";
import { setFieldError, clearFieldErrors, setButtonLoading, applyServerFieldErrors } from "../ui.js";

redirectIfLoggedIn();

const form = document.getElementById("login-form");
const formError = document.getElementById("form-error");
const notice = document.getElementById("notice");

const reasons = {
  expired: ["Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.", "bg-yellow-500/10 text-yellow-300"],
  required: ["Bạn cần đăng nhập để tiếp tục.", "bg-neutral-800 text-neutral-300"],
  logout: ["Bạn đã đăng xuất.", "bg-green-500/10 text-green-300"],
};
const reason = reasons[new URLSearchParams(location.search).get("reason")];
if (reason) {
  notice.textContent = reason[0];
  notice.className = `mb-4 rounded-lg px-4 py-3 text-sm ${reason[1]}`;
}

function validate({ email, password }) {
  let ok = true;
  if (!email) {
    setFieldError(form, "email", "Vui lòng nhập email.");
    ok = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    setFieldError(form, "email", "Email không hợp lệ.");
    ok = false;
  }
  if (!password) {
    setFieldError(form, "password", "Vui lòng nhập mật khẩu.");
    ok = false;
  }
  return ok;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearFieldErrors(form);
  formError.classList.add("hidden");

  const values = {
    email: form.email.value.trim(),
    password: form.password.value,
  };
  if (!validate(values)) return;

  const button = form.querySelector("button[type=submit]");
  setButtonLoading(button, true, "Đang đăng nhập...");

  try {
    await auth.login(values.email, values.password);
    window.location.href = "/index.html";
  } catch (error) {
    const message =
      error.status === 401 || error.status === 400
        ? error.message || "Email hoặc mật khẩu không đúng."
        : error instanceof ApiError
          ? error.message
          : "Không kết nối được máy chủ. Kiểm tra mạng và thử lại.";
    formError.textContent = message;
    formError.classList.remove("hidden");
    applyServerFieldErrors(form, error);
    setButtonLoading(button, false);
  }
});