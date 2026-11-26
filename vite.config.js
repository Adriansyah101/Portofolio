import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// The site is served from the root of its custom domain, https://adriansyahpn.com/
// (public/CNAME), so every built asset path starts at "/". Routing is hash-based,
// so the document itself is always /index.html and root paths resolve on every route.
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        // Split heavy vendors into long-term cacheable chunks.
        manualChunks(id) {
          // Keep Vite's tiny dynamic-import helper in an always-loaded chunk;
          // left alone, Rollup can place it in the Three.js chunk and force
          // every page (even ones without 3D) to download Three.js up front.
          if (id.includes("vite/preload-helper") || id.includes("commonjsHelpers")) return "react";
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
