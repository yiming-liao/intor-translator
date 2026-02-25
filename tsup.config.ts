import path from "node:path";
import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["export/index.ts", "export/internal/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    outDir: "dist",
    treeshake: true,
    clean: true,
    esbuildOptions(options) {
      options.alias = { "@": path.resolve(__dirname, "src") };
    },
  },
]);
