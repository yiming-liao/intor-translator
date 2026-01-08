import type { Locale } from "./locale";

type MessagePrimitive = string | number | boolean | null;
type MessageArray = readonly MessageValue[];

/**
 * A recursive message tree object.
 *
 * Represents the root message structure for a single locale
 * (i.e. the value of `LocaleMessages[locale]`).
 */
export interface MessageObject {
  [key: string]: MessageValue;
}

/** A message value in the locale message tree. */
export type MessageValue = MessagePrimitive | MessageObject | MessageArray;

/**
 * A non-traversable message value.
 *
 * Leaf values represent the end of a message path.
 */
export type MessageLeaf = MessagePrimitive | MessageArray;

/**
 * Messages grouped by locale.
 * Used to structure all available messages for multiple locales.
 *
 * - The root-level keys are locale identifiers, e.g., "en" or "zh-TW".
 * - Each value is a `MessageObject`, allowing for deeply nested message objects.
 *
 * @example
 * ```ts
 * const messages: LocaleMessages = {
 *   en: {
 *     welcome: "Welcome",
 *     auth: {
 *       login: {
 *         success: "Login successful",
 *         failure: "Login failed"
 *       }
 *     }
 *   }
 * };
 * ```
 */
export type LocaleMessages = Record<string, MessageObject>;

/**
 * Merges messages from all locales into a single unified structure,
 * or extracts messages for a specific locale if `L` is provided.
 *
 * @example
 * ```ts
 * const messages = {
 *   en: { greeting: { morning: "morning" } },
 *   zh: { greeting: { evening: "晚上好" } },
 * };
 *
 * // 1. Union of all locales
 * UnionLocaleMessages<typeof messages>;
 * // → { greeting: { morning: string; }; } | { greeting: { evening: string; }; }
 *
 * // 2. Messages for a specified locale
 * UnionLocaleMessages<typeof messages, "en">; // → { greeting: { morning: string; }; }
 * UnionLocaleMessages<typeof messages, "zh">; // → { greeting: { evening: string; }; }
 *
 * // 3. Fallback if M is not LocaleMessages
 * UnionLocaleMessages // → unknown
 * ```
 */
export type LocalizedMessagesUnion<
  M = unknown,
  L extends keyof M | "union" = "union",
> = M extends LocaleMessages
  ? L extends "union"
    ? M[Locale<M>]
    : M[L & keyof M]
  : unknown;
