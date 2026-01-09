import type { TranslateConfig } from "./translate-config";
import type { TranslateContext, TranslateHook } from "./types";
import type {
  Locale,
  LocaleMessages,
  MessageValue,
  Replacement,
} from "@/types";
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
  return rura.run<TranslateContext, MessageValue>(context, options.hooks);
}
