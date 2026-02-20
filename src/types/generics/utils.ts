import type { LocaleMessages, MessageLeaf, MessageObject } from "../messages";

/**
 * Default maximum recursive depth for nested key type computations,
 * balancing type safety and compiler performance.
 */
type DefaultDepth = 15;

/** Countdown tuple for limiting recursive depth (up to 15 levels). */
type PrevDepth = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

/** Detects `any` to prevent infinite type recursion. */
type IsAny<T> = 0 extends 1 & T ? true : false;

/** Detects `never` for safe conditional branching in type pipelines. */
export type IsNever<T> = [T] extends [never] ? true : false;

/**
 * Expands a single object property into its dot-separated path form.
 *
 * @example
 * ```ts
 * ExpandPath<"user", { name: string }>; // => "user" | "user.name"
 * ```
 *
 */
type ExpandPath<
  K extends PropertyKey,
  V,
  IncludeSelf extends boolean = true,
  D extends number = DefaultDepth,
> = V extends MessageLeaf
  ? `${K & string}`
  : V extends MessageObject
    ? IncludeSelf extends true
      ?
          | `${K & string}`
          | `${K & string}.${GeneratePaths<V, IncludeSelf, PrevDepth[D]>}`
      : `${K & string}.${GeneratePaths<V, IncludeSelf, PrevDepth[D]>}`
    : never;

/**
 * Generates dot-separated path strings from a nested message object.
 * @example
 * ```ts
 * GeneratePaths<{ user: { name: "Ivan" } }>; // => "user" | "user.name"
 * ```
 */
export type GeneratePaths<
  M,
  IncludeSelf extends boolean = true,
  D extends number = DefaultDepth,
> =
  IsAny<M> extends true
    ? never
    : [D] extends [never]
      ? never
      : M extends MessageObject
        ? { [K in keyof M]: ExpandPath<K, M[K], IncludeSelf, D> }[keyof M]
        : never;

/**
 * Resolves the type located at a dot-separated path.
 *
 * @example
 * ```ts
 * AtPath<{ a: { b: { c: string } } }, "a.b">; // => { c: string };
 * ```
 */
export type AtPath<
  MessageSchema,
  PK extends string,
> = PK extends `${infer Head}.${infer Tail}`
  ? Head extends keyof MessageSchema
    ? AtPath<MessageSchema[Head], Tail>
    : never
  : PK extends keyof MessageSchema
    ? MessageSchema[PK]
    : never;

/** Conditional helper for branching on `LocaleMessages`. */
export type IfLocaleMessages<T, Then, Else> = T extends LocaleMessages
  ? Then
  : Else;

/** Narrows a type to `MessageObject`, otherwise resolves to never. */
export type IfMessageObject<T> = T extends MessageObject ? T : never;

/** Detects whether `M` is the generic runtime `LocaleMessages` type. */
export type IsRuntime<M> = [M] extends [LocaleMessages]
  ? [LocaleMessages] extends [M]
    ? true
    : false
  : false;
