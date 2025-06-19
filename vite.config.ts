import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "minze-box-web-editor",
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    allowedHosts: true,
  },
});
