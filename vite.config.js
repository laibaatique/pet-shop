import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // plugins: [reactRefresh(), react()],
  // optimizeDeps: {
  //   exclude: ["jsonwebtoken"], // Exclude jsonwebtoken from being optimized
  // },
  // resolve: {
  //   alias: {
  //     buffer: "buffer", // Provide a buffer alias for jsonwebtoken
  //     crypto: "crypto", // Provide a crypto alias for jsonwebtoken
  //   },
  // },
});
