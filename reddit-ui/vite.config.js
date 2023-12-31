import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import config from "./../reddit-api/config/env";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: `http://localhost:${config.PORT || 5000}/api`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
