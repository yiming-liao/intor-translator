import type { TranslateConfig } from "@/translators/core-translator/translate-config.types";
import type { LocaleMessages, Replacement, MessageValue } from "@/types";
import type { RuraHook } from "rura";

/**
 * Context object shared across the translate pipeline.
 */
export interface TranslateContext {
  /** Configuration for the translate pipeline. */
  config: TranslateConfig;

  /** Current messages for translation */
  messages: LocaleMessages;
  /** Current active locale */
  locale: string;
  /** Current loading state */
  isLoading?: boolean;

  /** Message key to look up in the messages map */
  key: string;
  /** Optional value replacements */
  replacements?: Replacement;

  /** Ordered list of locales to try, including fallbacks */
  candidateLocales: string[];
  /** Raw message value resolved from the message tree. */
  rawMessage?: MessageValue;
  /** Message after formatting (e.g. ICU, custom formatters) */
  formattedMessage?: MessageValue;
  /** Final value produced by the pipeline */
  finalMessage?: MessageValue;

  /** Free-form metadata shared between hooks. */
  meta: Record<string, unknown>;
}

/**
 * A single step in the translate pipeline.
 */
export type TranslateHook = RuraHook<TranslateContext, MessageValue>;
