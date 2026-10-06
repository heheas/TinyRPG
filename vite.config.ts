import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    open: true,
  },

  base: process.env.VITE_BASE_PATH || "/TinyRPG",
});
