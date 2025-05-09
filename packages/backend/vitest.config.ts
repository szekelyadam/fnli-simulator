import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        setupFiles: ["./src/__tests__/setup.ts"],
        include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}"],
        coverage: {
            reporter: ["text", "json", "html"],
            include: ["src/**/*.{js,ts}"],
            exclude: [
                "src/**/*.d.ts",
                "src/**/*.test.{js,ts}",
                "src/**/*.spec.{js,ts}",
                "src/__tests__/setup.ts",
            ],
        },
    },
});
