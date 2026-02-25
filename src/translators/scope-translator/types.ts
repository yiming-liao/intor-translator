import type {
  Locale,
  LocalizedKey,
  LocalizedValue,
  ScopedReplacement,
  ScopedKey,
  ScopedValue,
} from "../../types";
import type { CoreTranslatorOptions } from "../core-translator";

export type ScopeTranslatorOptions<M> = CoreTranslatorOptions<M>;

export type ScopeTranslatorMethods<
  M = unknown,
  ReplacementShape = unknown,
  PK extends string | undefined = undefined,
  K extends string = PK extends string ? ScopedKey<M, PK> : LocalizedKey<M>,
> = {
  hasKey: (key?: K, targetLocale?: Locale<M>) => boolean;

  t: <Key extends K>(
    key?: Key,
    replacements?: ScopedReplacement<ReplacementShape, PK, K>,
  ) => PK extends string ? ScopedValue<M, PK, Key> : LocalizedValue<M, Key>;
};
