import { resolve } from "node:path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

const root = import.meta.dirname;

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    // Dự án nhiều trang: khai báo đủ 4 file HTML để Vite build cả 4
    rolldownOptions: {
      input: {
        main: resolve(root, "index.html"),
        login: resolve(root, "login.html"),
        register: resolve(root, "register.html"),
        profile: resolve(root, "profile.html"),
      },
    },
  },
});