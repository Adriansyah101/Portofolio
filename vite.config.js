import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// `base: "./"` makes every built asset path relative, so the site works
// unchanged at https://<username>.github.io/<repo-name>/ (or any sub-path).
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        // Split heavy vendors into long-term cacheable chunks.
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (
            id.includes("three") ||
            id.includes("@react-three") ||
            id.includes("postprocessing")
          ) {
            return "three";
          }
          if (id.includes("gsap")) return "gsap";
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return "react";
          return undefined;
        },
      },
    },
  },
});
