import type { TranslateContext } from "@/pipeline/types";
import type { HandlerContext } from "@/translators";
import type { MessageValue } from "@/types";
import { rura } from "rura";
import { makeHandlerContext } from "@/pipeline/utils/make-handler-context";

export const format = rura.createHook<TranslateContext, MessageValue>(
  "format",
  (ctx) => {
    const { config, rawString } = ctx;
    const { formatHandler } = config.handlers || {};
    if (!formatHandler || rawString === undefined) return;

    // Use custom handler if provided
    ctx.formattedMessage = formatHandler(
      makeHandlerContext(ctx) as HandlerContext & { rawString: string },
    );
  },
  500,
);
