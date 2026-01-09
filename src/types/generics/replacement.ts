import type { MessageObject } from "../messages";
import type { AtPath, IsNever } from "./utils";

/**
 * Generic replacement object used when no schema is available.
 *
 * Acts as a safe fallback for dynamic or unknown replacement shapes.
 */
export type Replacement = Record<string, unknown>;

/**
 * Replacement object resolved from a localized replacement schema.
 *
 * - If the key exists in the schema, resolves to the declared object shape
 * - Otherwise falls back to generic `Replacement`
 *
 * @example
 * ```ts
 * type ReplacementSchema = { "{locale}": { greeting: { name: string } } };
 * LocalizedReplacement<ReplacementSchema, "greeting">; // => { name: string }
 * LocalizedReplacement<ReplacementSchema, "missing">;  // => Replacement
 * ```
 */
export type LocalizedReplacement<
  ReplacementSchema,
  K extends string,
> = ReplacementSchema extends { "{locale}": infer LM }
  ? IsNever<AtPath<LM, K>> extends true
    ? Replacement
    : AtPath<LM, K> extends MessageObject
      ? AtPath<LM, K>
      : Replacement
  : Replacement;

/**
 * Replacement object resolved under a scoped prefix key.
 *
 * Internally composes the full dot-path (`"${PK}.${K}"`)
 * and delegates resolution to `LocalizedReplacement`.
 *
 * @example
 * ```ts
 * type ReplacementSchema = { "{locale}": { user: { info: { name: string } } } };
 * ScopedReplacement<ReplacementSchema, "user", "info">; // => { name: string }
 * ScopedReplacement<ReplacementSchema, "user", "missing">; // => Replacement
 * ```
 */
export type ScopedReplacement<
  ReplacementSchema,
  PK extends string | undefined,
  K extends string,
> = LocalizedReplacement<ReplacementSchema, `${PK}.${K}`>;
