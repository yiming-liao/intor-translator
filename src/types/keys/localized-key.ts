import type {
  DefaultDepth,
  LeafKeys,
  NodeKeys,
} from "@/types/keys/key-extraction-utils";
import type { LocaleMessages } from "@/types/messages";

/**
 * Extracts all **node keys** from the messages
 * of a specified locale (or union of locales).
 *
 * @example
 * ```ts
 * const messages = {
 *   en: { greeting: { morning: "morning" } },
 *   zh: { greeting: { evening: "晚上好" } },
 * };
 *
 * // 1. Union of all locales
 * LocalizedNodeKeys<typeof messages> // → "greeting" | "greeting.morning" | "greeting.evening"
 *
 * // 2. For a specified locale
 * LocalizedNodeKeys<typeof messages, "en"> // → "greeting" | "greeting.morning"
 * LocalizedNodeKeys<typeof messages, "zh"> // → "greeting" | "greeting.evening"
 *
 * // 3. Fallback when M is not LocaleMessages
 * LocalizedNodeKeys // → string
 * ```
 */
export type LocalizedNodeKeys<
  M = unknown,
  L extends keyof M | "union" = "union",
  D extends number = DefaultDepth,
> = M extends LocaleMessages
  ? L extends "union"
    ? NodeKeys<M[keyof M], D>
    : NodeKeys<M[Extract<L, keyof M>], D>
  : string;

/**
 * Extracts all **leaf keys** from the messages
 * of a specified locale (or union of locales).
 *
 * @example
 * ```ts
 * const messages = {
 *   en: { greeting: { morning: "morning" } },
 *   zh: { greeting: { evening: "晚上好" } },
 * };
 *
 * // 1. Union of all locales
 * LocalizedLeafKeys<typeof messages> // → "greeting.morning" | "greeting.evening"
 *
 * // 2. For a specified locale
 * LocalizedLeafKeys<typeof messages, "en"> // → "greeting.morning"
 * LocalizedLeafKeys<typeof messages, "zh"> // → "greeting.evening"
 *
 * // 3. Fallback if M is not LocaleMessages
 * LocalizedLeafKeys // → string
 * ```
 */
export type LocalizedLeafKeys<
  M = unknown,
  L extends keyof M | "union" = "union",
  D extends number = DefaultDepth,
> = M extends LocaleMessages
  ? L extends "union"
    ? LeafKeys<M[keyof M], D>
    : LeafKeys<M[Extract<L, keyof M>], D>
  : string;
