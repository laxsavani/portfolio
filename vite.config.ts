import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    // Raise warning limit — Three.js chunks are legitimately large
    chunkSizeWarningLimit: 600,
    // Enable minification with esbuild (default, fastest)
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Three.js + React Three Fiber/Drei — lazily loaded, separate chunk
          if (id.includes("three") || id.includes("@react-three")) {
            return "three-vendor";
          }
          // Framer Motion — large, separate chunk
          if (id.includes("framer-motion")) {
            return "framer-vendor";
          }
          // EmailJS — only used in ContactSection
          if (id.includes("@emailjs")) {
            return "emailjs-vendor";
          }
          // Radix UI primitives — grouped together
          if (id.includes("@radix-ui")) {
            return "radix-vendor";
          }
          // React core
          if (id.includes("react-dom") || id.includes("react-router-dom")) {
            return "react-vendor";
          }
          // Lucide icons — tree-shaken but still benefits from own chunk
          if (id.includes("lucide-react")) {
            return "lucide-vendor";
          }
        },
      },
    },
  },
  define: {
    // Enable React production optimizations
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
  },
});
