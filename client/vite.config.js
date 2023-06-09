import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Replace @ with current directory that leads up to our source dir
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
