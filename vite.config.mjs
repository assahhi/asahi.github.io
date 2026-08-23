import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const orientationAdvice = [
  "先把课程名换成问题清单：这门课能帮我解释什么、预测什么、做出什么决定？学习会更有方向。",
  "不要等到简历季才整理项目。每完成一次分析，就留下背景、方法、结果和反思四句话。",
  "工具不必一次学很多。先让 SQL、Python 或可视化中的一个成为你的稳定支点，再逐步扩展。",
  "尽早认识三类同学：和你方向相近的人、背景完全不同的人、愿意一起长期做事的人。",
  "给每周留一个没有会议和截止日期的半天。节奏感不是偷懒，而是长期高质量输出的前提。",
  "实习选择先看你能否接近真实问题和反馈闭环，再看岗位名称是否足够漂亮。",
  "课堂上遇到不懂的概念，先写下一个具体业务例子。能用例子讲清楚，通常才是真的理解。",
  "Orientation 最值得带走的不是所有信息，而是两位你愿意在开学后继续联系的人。",
];

function orientationApi() {
  return {
    name: "orientation-api",
    configureServer(server) {
      server.middlewares.use("/api/advice", (request, response) => {
        if (request.method !== "GET") {
          response.statusCode = 405;
          response.end();
          return;
        }

        response.setHeader("content-type", "application/json; charset=utf-8");
        response.setHeader("cache-control", "no-store");
        response.end(
          JSON.stringify({
            advice: orientationAdvice[Math.floor(Math.random() * orientationAdvice.length)],
            generatedAt: new Date().toISOString(),
            source: "orientation-field-notes-dev",
          }),
        );
      });

      server.middlewares.use("/api/health", (_request, response) => {
        response.setHeader("content-type", "application/json; charset=utf-8");
        response.end(JSON.stringify({ ok: true, service: "orientation-field-notes" }));
      });
    },
  };
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  build: {
    outDir: "dist/client",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react(), orientationApi()],
});
