import react from "@vitejs/plugin-react";
import copy from "rollup-plugin-copy";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: "public",
  index: "public/index.html",
  plugins: [
    react(),
    copy({
      targets: [{ src: "static/CNAME", dest: "dist" }],
    }),
  ],
});
