import type { LocaleMessages, Replacement, MessageValue } from "../types";
import type { TranslateConfig } from "./translate-config";
import type { RuraHook } from "rura";

/**
 * Context object shared across the translate pipeline.
 *
 * @public
 */
export interface TranslateContext {
  // ────────────────────────────────────────────
  // Input (read-only by convention)
  // ────────────────────────────────────────────
  /** Configuration for the translate pipeline. */
  config: Readonly<TranslateConfig>;
  /** Current messages for translation */
  messages: Readonly<LocaleMessages>;
  /** Current active locale */
  locale: string;
  /** Current loading state */
  isLoading?: boolean;
  /** Message key to look up in the messages map */
  key: string;
  /** Optional value replacements */
  replacements?: Readonly<Replacement>;

  // ────────────────────────────────────────────
  // Derived State (written by pipeline stages)
  // ────────────────────────────────────────────
  /** Ordered list of locales to try, including fallbacks */
  candidateLocales: string[];
  /** Raw message value resolved from the message tree. */
  rawMessage?: MessageValue;
  /** Message after formatting (e.g. ICU, custom formatters) */
  formattedMessage?: MessageValue;

  // ────────────────────────────────────────────
  // Output (authoritative result)
  // ────────────────────────────────────────────
  /** Final value produced by the pipeline */
  finalMessage?: MessageValue;

  // ────────────────────────────────────────────
  // Extension Channel
  // ────────────────────────────────────────────
  /** Free-form metadata shared between hooks. */
  meta: Record<string, unknown>;
}

/**
 * A single step in the translate pipeline.
 *
 * @public
 */
export type TranslateHook = RuraHook<TranslateContext, MessageValue>;
