import type { HandlerContext } from "../translate-config";
import type { TranslateContext } from "../types";

/**
 * Create an immutable context object exposed to external handlers.
 *
 * The returned object is frozen to prevent handlers from
 * mutating internal translator state.
 */
export function makeHandlerContext(ctx: TranslateContext): HandlerContext {
  return Object.freeze({
    config: ctx.config,

    messages: ctx.messages,
    locale: ctx.locale,
    isLoading: ctx.isLoading,

    key: ctx.key,
    replacements: ctx.replacements,

    candidateLocales: ctx.candidateLocales,
    rawMessage: ctx.rawMessage,
    formattedMessage: ctx.formattedMessage,

    meta: ctx.meta,
  });
}
