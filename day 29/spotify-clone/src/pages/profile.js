import "../style.css";
import { apiFetch, auth, storage, requireAuth } from "../api.js";
import { escapeHtml, pick, getImage, formatDate, loadingHtml, errorHtml } from "../ui.js";

requireAuth();

document.getElementById("logout-btn").addEventListener("click", auth.logout);

const root = document.getElementById("profile");

const LABELS = {
  id: "ID",
  username: "Tên đăng nhập",
  email: "Email",
  display_name: "Tên hiển thị",
  bio: "Giới thiệu",
  country: "Quốc gia",
  date_of_birth: "Ngày sinh",
  is_verified: "Đã xác minh",
  role: "Vai trò",
  followers_count: "Người theo dõi",
  following_count: "Đang theo dõi",
  created_at: "Ngày tạo",
  updated_at: "Cập nhật lần cuối",
};

const SKIP = ["avatar_url", "image_url", "avatar", "image", "password"];

function formatValue(key, value) {
  if (value === null || value === undefined || value === "") return `<span class="text-neutral-500">Chưa có</span>`;
  if (typeof value === "boolean") return value ? "Có" : "Không";
  if (/_at$|date/.test(key)) return escapeHtml(formatDate(value));
  if (typeof value === "object") return `<code class="text-xs">${escapeHtml(JSON.stringify(value))}</code>`;
  return escapeHtml(value);
}

function renderProfile(user) {
  const name = pick(user, ["display_name", "username", "email"]) || "Người dùng";
  const avatar = getImage(user);

  const rows = Object.entries(user)
    .filter(([key]) => !SKIP.includes(key))
    .map(
      ([key, value]) => `
      <div class="grid grid-cols-1 gap-1 border-b border-neutral-800 py-3 sm:grid-cols-[12rem_1fr]">
        <dt class="text-sm text-neutral-400">${escapeHtml(LABELS[key] || key)}</dt>
        <dd class="break-words">${formatValue(key, value)}</dd>
      </div>`
    )
    .join("");

  root.innerHTML = `
    <section class="-mx-4 flex flex-col items-center gap-6 bg-gradient-to-b from-green-800/60 to-black px-4 pb-8 pt-10 sm:-mx-8 sm:flex-row sm:items-end sm:px-8">
      ${avatar
        ? `<img src="${escapeHtml(avatar)}" alt="${escapeHtml(name)}" class="h-40 w-40 rounded-full object-cover shadow-2xl sm:h-48 sm:w-48" />`
        : `<div class="flex h-40 w-40 items-center justify-center rounded-full bg-neutral-800 text-6xl font-bold shadow-2xl sm:h-48 sm:w-48">${escapeHtml(name[0].toUpperCase())}</div>`}
      <div class="text-center sm:text-left">
        <p class="text-sm font-semibold">Hồ sơ</p>
        <h1 class="mt-1 text-4xl font-black sm:text-6xl">${escapeHtml(name)}</h1>
        ${user.bio ? `<p class="mt-3 text-neutral-300">${escapeHtml(user.bio)}</p>` : ""}
        ${user.email ? `<p class="mt-2 text-sm text-neutral-400">${escapeHtml(user.email)}</p>` : ""}
      </div>
    </section>

    <section class="mt-8">
      <h2 class="mb-2 text-2xl font-bold">Thông tin tài khoản</h2>
      <dl>${rows}</dl>
    </section>`;
}

async function loadProfile() {
  root.innerHTML = `<div class="pt-10">${loadingHtml("Đang tải thông tin cá nhân...")}</div>`;
  try {
    const data = await apiFetch("/api/users/me");
    const user = data.user || data.data || data;
    storage.setUser(user);
    renderProfile(user);
  } catch (error) {
    root.innerHTML = `
      <div class="space-y-4 pt-10">
        ${errorHtml(`Không tải được thông tin: ${error.message}`)}
        <button id="retry" class="rounded-full bg-white px-5 py-2 font-semibold text-black">Thử lại</button>
      </div>`;
    document.getElementById("retry").addEventListener("click", loadProfile);
  }
}

loadProfile();