import type { MessageObject } from "../messages";
import type { AtPath, IsNever } from "./utils";
import type { Attributes } from "@/message/types";

/**
 * Generic rich tag map used when no schema is available.
 *
 * Acts as a safe fallback for dynamic or unknown rich tag shapes.
 */
export type Rich = Record<string, Attributes>;

/**
 * Rich tag map resolved from a localized rich schema.
 *
 * - If the key exists in the schema, resolves to the declared tag map
 * - Otherwise falls back to generic `Rich`
 *
 * @example
 * ```ts
 * type RichSchema = { "{locale}": { link: { a: { href: string } } } }
 * LocalizedRich<RichSchema, "link"> // => { a: { href: string } }
 * LocalizedRich<RichSchema, "missing">; // => Rich
 * ```
 */
export type LocalizedRich<RichSchema, K extends string> = RichSchema extends {
  "{locale}": infer LM;
}
  ? IsNever<AtPath<LM, K>> extends true
    ? Rich
    : AtPath<LM, K> extends MessageObject
      ? AtPath<LM, K>
      : Rich
  : Rich;

/**
 * Rich tag map resolved under a scoped prefix key.
 *
 * Internally composes the full dot-path (`"${PK}.${K}"`)
 * and delegates resolution to `LocalizedRich`.
 *
 * @example
 * ```ts
 * type RichSchema = { "{locale}": { app: { link: { a: { href: string } } } } };
 * ScopedRich<RichSchema, "app", "link">; // => { a: { href: string } }
 * ScopedRich<RichSchema, "app", "missing">; // => Rich
 * ```
 */
export type ScopedRich<
  RichSchema,
  PK extends string | undefined,
  K extends string,
> = LocalizedRich<RichSchema, `${PK}.${K}`>;
