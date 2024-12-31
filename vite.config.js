import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig((opt) => {
  return {
    root: "src",
    build: {
      outDir: "../dist",
      rollupOptions: {
        input: {
          main: resolve(__dirname, "src/main.ts"),
          popup: resolve(__dirname, "src/popup.ts"),
        },
        output: {
          entryFileNames: (chunk) => {
            if (chunk.name === "popup") {
              return "popup.js";
            }
            return "[name].js";
          },
        },
      },
    },
  };
});
