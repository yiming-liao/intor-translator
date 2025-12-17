import type { TranslateContext } from "@/pipeline/types";
import { rura } from "rura";
import { resolveCandidateLocales } from "@/translators/shared/utils/resolve-candidate-locales";

export const resolveLocales = rura.createHook<TranslateContext>(
  "resolveLocales",
  (ctx) => {
    ctx.candidateLocales = resolveCandidateLocales(
      ctx.locale,
      ctx.config.fallbackLocales,
    );
  },
  100,
);
