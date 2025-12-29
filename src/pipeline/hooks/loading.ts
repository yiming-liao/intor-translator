import type { TranslateContext } from "@/pipeline/types";
import { rura } from "rura";
import { makeHandlerContext } from "@/pipeline/utils/make-handler-context";

export const loading = rura.createHook<TranslateContext>(
  "loading",
  (ctx) => {
    const { config, isLoading } = ctx;
    if (!isLoading) return;

    // Use custom handler if provided
    const { loadingHandler } = config.handlers || {};
    if (loadingHandler) {
      return {
        early: true,
        output: loadingHandler(makeHandlerContext(ctx)),
      };
    }

    // Static message
    const { loadingMessage } = config;
    if ("loadingMessage" in config) {
      return { early: true, output: loadingMessage };
    }
  },
  300,
);
