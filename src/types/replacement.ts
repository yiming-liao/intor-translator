import type { MessageObject } from "./messages";
import type { AtPath } from "./paths";

/**
 * Represents a replacement map used for interpolating values
 * in message templates.
 *
 * Replacement values are treated as plain data and interpreted
 * by the message formatter at runtime.
 *
 * @example
 * const replacements: Replacement = {
 *   name: "Alice",
 *   count: 5,
 *   nested: {
 *     score: 100,
 *   },
 * };
 */
export type Replacement = Record<string, unknown>;

/**
 * Resolves the expected replacement type for a localized message key.
 *
 * Uses the canonical (default-locale) replacement schema when available,
 * otherwise falls back to `Replacement`.
 *
 * @example
 * ```ts
 * interface ReplacementSchema {
 *   "{locale}": {
 *     welcome: { name: MessageValue };
 *     total: { count: MessageValue };
 *   };
 * };
 *
 * type WelcomeReplacement = LocalizedReplacement<ReplacementSchema, "welcome">;
 * // => { name: MessageValue }
 *
 * type UnknownReplacement = LocalizedReplacement<ReplacementSchema, "unknown">;
 * // => Replacement
 * ```
 */
export type LocalizedReplacement<
  ReplacementSchema,
  K extends string,
> = ReplacementSchema extends {
  "{locale}": infer LM;
}
  ? AtPath<LM, K> extends MessageObject
    ? AtPath<LM, K>
    : Replacement
  : Replacement;

/**
 * Resolves the replacement type for a scoped translation key.
 *
 * Combines the scope prefix (`PK`) and local key (`K`)
 * into a full dot-path for replacement schema lookup.
 */
export type ScopedReplacement<
  ReplacementSchema,
  PK extends string | undefined,
  K extends string,
> = LocalizedReplacement<ReplacementSchema, `${PK}.${K}`>;
