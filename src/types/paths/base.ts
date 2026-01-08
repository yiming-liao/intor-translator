import type { MessageLeaf } from "../messages";

/**
 * Default maximum recursive depth for nested key type computations,
 * balancing type safety and compiler performance.
 */
export type DefaultDepth = 15;

/** Countdown tuple for limiting recursive depth (up to 15 levels). */
type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

/**
 * Gets all dot-separated keys of a nested object, stopping at message leaf values.
 *
 * @example
 * ```ts
 * NodeKeys<{ a: { b: { c: string }, d: string } }> // → "a" | "a.b" | "a.b.c" | "a.d"
 * ```
 */
export type NodeKeys<M, D extends number = DefaultDepth> = [D] extends [never]
  ? never
  : M extends object
    ? {
        [K in keyof M]: M[K] extends MessageLeaf
          ? `${K & string}`
          : M[K] extends object
            ? `${K & string}` | `${K & string}.${NodeKeys<M[K], Prev[D]>}`
            : never;
      }[keyof M]
    : never;

/**
 * Gets dot-separated keys that resolve to message leaf values in a nested object.
 *
 * @example
 * ```ts
 * LeafKeys<{ a: { b: { c: string }, d: string } }> // → "a.d" | "a.b.c"
 * ```
 */
export type LeafKeys<M, D extends number = DefaultDepth> = [D] extends [never]
  ? never
  : M extends object
    ? {
        [K in keyof M]: M[K] extends MessageLeaf
          ? `${K & string}`
          : M[K] extends object
            ? `${K & string}.${LeafKeys<M[K], Prev[D]>}`
            : never;
      }[keyof M]
    : never;

/**
 * Resolves the value type at a given dot-separated leaf key
 * within a nested message object.
 *
 * @example
 * ```ts
 * LeafValue<{ a: { b: { c: string } } }, "a.b.c"> // → string
 * ```
 */
export type LeafValue<
  M,
  K extends string,
> = K extends `${infer Seg}.${infer Rest}`
  ? Seg extends keyof M
    ? LeafValue<M[Seg], Rest>
    : never
  : K extends keyof M
    ? M[K]
    : never;
