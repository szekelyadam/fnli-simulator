import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./src/setupTests.ts"],
        include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        coverage: {
            reporter: ["text", "json", "html"],
            include: ["src/**/*.{js,jsx,ts,tsx}"],
            exclude: [
                "src/**/*.d.ts",
                "src/**/*.test.{js,jsx,ts,tsx}",
                "src/**/*.spec.{js,jsx,ts,tsx}",
                "src/setupTests.ts",
            ],
        },
    },
});
