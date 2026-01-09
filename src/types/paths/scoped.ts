import type { LocaleMessages, MessageObject, MessageValue } from "../messages";
import type { DefaultDepth, LeafKeys, LeafValue } from "./base";
import type { Locale } from "../locale";

/**
 * Resolves the type at a dot-separated key in a nested object.
 *
 * @example
 * ```ts
 * const structure = {
 *   a: {
 *     b: { c: "hello" },
 *     z: "world",
 *   },
 * };
 *
 * MessagesAtPreKey<typeof structure, "a"> // → { b: { c: string; }; z: string;}
 * MessagesAtPreKey<typeof structure, "a.b"> // → { c: string; };
 * ```
 */
type MessagesAtPreKey<
  T,
  PK extends string,
> = PK extends `${infer Head}.${infer Tail}`
  ? Head extends keyof T
    ? MessagesAtPreKey<T[Head], Tail>
    : never
  : PK extends keyof T
    ? T[PK]
    : never;

/**
 * Extracts all **leaf keys** under a scoped path (`PK`) from the messages
 * of a specified locale (`L`) (or union of locales).
 *
 * @example
 * ```ts
 * const messages = {
 *   en: { a: { b: { c: "hello" }, z: "world" } },
 *   zh: { a: { b: "hello" },
 * };
 *
 * ScopedLeafKeys<typeof messages, "a">; // → "b.c" | "z"
 * ScopedLeafKeys<typeof messages, "a.b">; // → "c"
 * ScopedLeafKeys<typeof messages, "a", "zh">; // →  "b"
 * ```
 */
export type ScopedLeafKeys<
  M,
  PK extends string,
  D extends number = DefaultDepth,
> = M extends LocaleMessages
  ? M[Locale<M>] extends infer Messages
    ? Messages extends MessageValue
      ? MessagesAtPreKey<Messages, PK> extends infer Scoped
        ? Scoped extends MessageObject
          ? LeafKeys<Scoped, D>
          : never
        : never
      : never
    : never
  : string;

/**
 * Resolves the value type of a scoped leaf key (`K`)
 * under a prefix path (`PK`) from localized messages.
 *
 * @example
 * ```ts
 * const messages = {
 *   en: { a: { b: { c: "hello" }, z: [123] } },
 * };
 *
 * ScopedLeafValue<typeof messages, "a", "z">;  // number[]
 * ScopedLeafValue<typeof messages, "a.b", "c">;  // string
 * ```
 */
export type ScopedLeafValue<
  M,
  PK extends string,
  K extends string,
> = M extends LocaleMessages
  ? M[Locale<M>] extends infer Messages
    ? Messages extends MessageValue
      ? MessagesAtPreKey<Messages, PK> extends infer Scoped
        ? Scoped extends MessageObject
          ? LeafValue<Scoped, K>
          : never
        : never
      : never
    : never
  : MessageValue;
