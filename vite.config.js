import { copyFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * GitHub Pages has no rewrite rules: a direct load of a client route such as
 * /projects/niskala finds no file and serves 404.html. A copy of index.html
 * under that name boots the app there, and React Router renders the route.
 */
const spaFallback = () => {
  let outDir = "dist";
  return {
    name: "spa-404-fallback",
    apply: "build",
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      copyFileSync(resolve(outDir, "index.html"), resolve(outDir, "404.html"));
    },
  };
};

// The site is served from the root of its custom domain, https://adriansyahpn.com/
// (public/CNAME), with clean URLs (BrowserRouter). Every built asset path starts
// at "/", so it resolves the same on /, /projects and /projects/niskala.
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss(), spaFallback()],
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
