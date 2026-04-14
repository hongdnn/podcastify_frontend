import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [tailwindcss()],
    build: {
        outDir: "build",
    },
    test: {
        include: ["tests/**/*.test.ts", "tests/**/*.spec.ts"],
    },
});
