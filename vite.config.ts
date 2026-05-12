import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import vitsTsConfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    vitsTsConfigPaths(),
    TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
  ],
  build: {
    outDir: "dist",
  },
});
