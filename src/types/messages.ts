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
