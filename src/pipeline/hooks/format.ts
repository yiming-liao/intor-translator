import type { TranslateContext, HandlerContext } from "@/pipeline";
import type { MessageValue } from "@/types";
import { rura } from "rura";
import { makeHandlerContext } from "@/pipeline/utils/make-handler-context";

export const format = rura.createHook<TranslateContext, MessageValue>(
  "format",
  (ctx) => {
    const { config, rawMessage } = ctx;
    const { formatHandler } = config.handlers || {};
    if (!formatHandler || rawMessage === undefined) return;

    // Use custom handler if provided
    ctx.formattedMessage = formatHandler(
      makeHandlerContext(ctx) as HandlerContext & { rawMessage: string },
    );
  },
  500,
);
