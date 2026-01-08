import type { TranslateContext } from "@/pipeline/types";
import type { MessageValue } from "@/types";
import { rura } from "rura";
import { findMessageInLocales } from "@/shared/utils/find-message-in-locales";

export const findMessage = rura.createHook<TranslateContext, MessageValue>(
  "findMessage",
  (ctx) => {
    ctx.rawValue = undefined;
    ctx.rawString = undefined;

    const message = findMessageInLocales({
      messages: ctx.messages,
      candidateLocales: ctx.candidateLocales,
      key: ctx.key,
    });

    ctx.rawValue = message;
    if (typeof message === "string") ctx.rawString = message;
  },
  200,
);
