import type { TranslateConfig } from "@/translators/core-translator/translate-config.types";
import type { LocaleMessages, Replacement, MessageValue } from "@/types";
import type { RuraHook } from "rura";

/**
 * Context object shared across the translate pipeline.
 *
 * @template Result - Final translated value type.
 */
export interface TranslateContext<Result = unknown> {
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
  rawValue?: MessageValue;
  /** Raw string message before formatting. */
  rawString?: string;
  /** Message after formatting (e.g. ICU, custom formatters) */
  formattedMessage?: unknown;
  /** Final value produced by the pipeline */
  finalMessage?: Result;

  /** Free-form metadata shared between hooks. */
  meta: Record<string, unknown>;
}

/**
 * A single step in the translate pipeline.
 */
export type TranslateHook = RuraHook<TranslateContext>;
