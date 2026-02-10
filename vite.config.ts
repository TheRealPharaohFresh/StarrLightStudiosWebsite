import { defineConfig } from "vitest/config";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ["**/._*", "**/_broken_backup/**"],
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/tests/setupTests.ts",
    css: true,
    exclude: ["**/node_modules/**", "**/dist/**", "**/._*"],
  },
})
