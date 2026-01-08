import type { TranslateContext, TranslateHook } from "@/pipeline/types";
import type { TranslateConfig } from "@/translators/core-translator/translate-config.types";
import type { Locale, LocaleMessages, Replacement } from "@/types";
import { rura } from "rura";

export type TranslateParams = {
  hooks: TranslateHook[];
  messages: Readonly<LocaleMessages>;
  locale: Locale;
  isLoading: boolean;
  translateConfig: TranslateConfig;
  key: string;
  replacements?: Replacement;
};

export function runTranslate(options: TranslateParams) {
  const context: TranslateContext = {
    ...options,
    config: options.translateConfig,
    candidateLocales: [],
    meta: {},
  };
  return rura.run(context, options.hooks);
}
