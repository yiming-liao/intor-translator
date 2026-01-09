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
