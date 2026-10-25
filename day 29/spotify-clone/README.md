# Spotify Clone – Bài 29 (F8) – Vite

## Chạy
```bash
npm install
npm run dev      # mở http://localhost:5173/login.html
npm run build    # build ra thư mục dist/
```

## Cấu trúc
```
index.html, login.html, register.html, profile.html   4 trang
vite.config.js        Khai báo 4 trang + plugin Tailwind
src/style.css         Nạp Tailwind
src/api.js            apiFetch, lưu token, tự refresh khi 401, logout, chặn trang
src/ui.js             Hàm giao diện dùng chung (loading, lỗi, escape HTML...)
src/pages/*.js        Logic riêng từng trang
```

## Ghi chú
- Playlists đang gọi `/api/playlists` (đề ghi `/api/tracks`, có thể gõ nhầm). Sửa trong `src/pages/home.js` nếu cần.
- Refresh token gửi body `{ "refresh_token": "..." }`. Sửa trong `refreshAccessToken` ở `src/api.js` nếu API dùng tên khác.
