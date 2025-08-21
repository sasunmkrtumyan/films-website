import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// import path from "path"; // Removed because 'path' is not available in browser environments

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@components": "/src/shared/components",
      "@hooks": "/src/hooks",
      "@assets": "/src/assets",
      "@pages": "/src/pages",
      "@lib": "/src/lib",
    },
  },
  assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.svg"],
});
