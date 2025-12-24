import type { TranslateContext } from "@/pipeline/types";
import { rura } from "rura";
import { replaceValues } from "./replace-values";

export const interpolate = rura.createHook<TranslateContext>(
  "interpolate",
  (ctx) => {
    const { rawMessage, formattedMessage, replacements } = ctx;
    const message = formattedMessage ?? rawMessage;

    // Interpolation applies only to string messages with replacement values.
    // Structural or function-based replacements are handled later.
    if (typeof message !== "string" || !replacements) {
      ctx.finalMessage = message;
      return;
    }

    // Replace `{key}` placeholders with primitive values only.
    ctx.finalMessage = replaceValues(message, replacements);
  },
  600,
);
