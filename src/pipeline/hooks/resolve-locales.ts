import type { TranslateContext } from "@/pipeline/types";
import type { MessageValue } from "@/types";
import { rura } from "rura";
import { resolveCandidateLocales } from "@/shared/utils/resolve-candidate-locales";

export const resolveLocales = rura.createHook<TranslateContext, MessageValue>(
  "resolveLocales",
  (ctx) => {
    ctx.candidateLocales = resolveCandidateLocales(
      ctx.locale,
      ctx.config.fallbackLocales,
    );
  },
  100,
);
