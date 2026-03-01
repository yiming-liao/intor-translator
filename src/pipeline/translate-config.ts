import type { FallbackLocalesMap, Locale, MessageValue } from "../types";
import type { TranslateContext } from "./types";

/**
 * Configuration options for translation behavior.
 *
 * @public
 */
export type TranslateConfig<M = unknown> = {
  /** Optional mapping of fallback locales to use when a message is missing in the current locale. */
  fallbackLocales?: FallbackLocalesMap<Locale<M>>;
  /** Optional message to display while translations are still loading. */
  loadingMessage?: string;
  /** Optional message used when a translation is missing. */
  missingMessage?: string;
  /** Optional set of handler functions for customizing translation behavior. */
  handlers?: TranslateHandlers;
};

/**
 * Optional handler functions for customizing translation behavior
 *
 * @public
 */
export type TranslateHandlers = {
  /** Function called when a translation is still loading. */
  loadingHandler?: LoadingHandler;
  /** Function called when no message is found for a given key. */
  missingHandler?: MissingHandler;
  /** Function to format a resolved message before returning it. */
  formatHandler?: FormatHandler;
};

/**
 * Function called when translation is still loading.
 *
 * @public
 */
export type LoadingHandler = (ctx: HandlerContext) => MessageValue;
/**
 * Function called when no message is found for the given key.
 *
 * @public
 */
export type MissingHandler = (ctx: HandlerContext) => MessageValue;
/**
 * Function to format a resolved message.
 *
 * @public
 */
export type FormatHandler = (
  ctx: HandlerContext & { rawMessage: string },
) => MessageValue;

/**
 * Snapshot of the translate pipeline context exposed to handlers.
 *
 * This is a readonly view of TranslateContext:
 * - Handlers can inspect the translation state
 * - Handlers must NOT modify it
 * - Pipeline will not be affected by handler changes
 *
 * @public
 */
export type HandlerContext = Readonly<
  Pick<
    TranslateContext,
    "locale" | "isLoading" | "key" | "replacements" | "rawMessage" | "meta"
  >
>;
