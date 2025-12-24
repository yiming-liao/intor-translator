import type { TranslateContext } from "@/pipeline/types";
import { rura } from "rura";
import { findMessageInLocales } from "@/shared/utils/find-message-in-locales";

export const findMessage = rura.createHook<TranslateContext>(
  "findMessage",
  (ctx) => {
    ctx.rawMessage = findMessageInLocales({
      messages: ctx.messages,
      candidateLocales: ctx.candidateLocales,
      key: ctx.key,
    });
  },
  200,
);
