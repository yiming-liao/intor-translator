import type { TranslateContext } from "@/pipeline/types";
import { rura } from "rura";
import { replaceValues } from "@/translators/shared/utils/replace-values";

export const interpolate = rura.createHook<TranslateContext>(
  "interpolate",
  (ctx) => {
    const { rawMessage, formattedMessage, replacements } = ctx;
    const message = formattedMessage ?? rawMessage;

    if (typeof message !== "string" || !replacements) {
      ctx.finalMessage = message;
      return;
    }

    ctx.finalMessage = replaceValues(message, replacements);
  },
  600,
);
