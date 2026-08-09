import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  // 1. Khai báo các file HTML đầu vào cho Vite (Multi-Page App)
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/pages/html/index.html"),
        login: resolve(__dirname, "src/pages/html/login.html"),
        chat: resolve(__dirname, "src/pages/html/chat.html"),
      },
    },
  },
  // 2. Mặc định mở trang index khi chạy npm run dev
  server: {
    open: "/src/pages/html/login.html",
  },
  // 3. Plugin hỗ trợ điều hướng đường dẫn ngắn (Rewrite URL) khi phát triển
  plugins: [
    {
      name: "mpa-router-rewrite",
      configureServer(server) {
        server.middlewares.use((request, response, next) => {
          if (request.url === "/" || request.url === "/index.html") {
            request.url = "/src/pages/html/index.html";
          } else if (
            request.url === "/login" ||
            request.url === "/login.html"
          ) {
            request.url = "/src/pages/html/login.html";
          } else if (request.url === "/chat" || request.url === "/chat.html") {
            request.url = "/src/pages/html/chat.html";
          }
          next();
        });
      },
    },
  ],
});
