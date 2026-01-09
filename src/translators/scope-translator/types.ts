import type { CoreTranslatorOptions } from "../core-translator";
import type {
  Locale,
  LocaleMessages,
  LocalizedKey,
  LocalizedValue,
  ScopedReplacement,
  ScopedKey,
  ScopedValue,
} from "@/types";

export type ScopeTranslatorOptions<M> = CoreTranslatorOptions<M>;

export type ScopeTranslatorMethods<
  M extends LocaleMessages | unknown = unknown,
  ReplacementSchema = unknown,
  PK extends string | undefined = undefined,
  K extends string = PK extends string ? ScopedKey<M, PK> : LocalizedKey<M>,
> = {
  hasKey: (key?: K, targetLocale?: Locale<M>) => boolean;

  t: <Key extends K>(
    key?: Key,
    replacements?: ScopedReplacement<ReplacementSchema, PK, K>,
  ) => PK extends string ? ScopedValue<M, PK, Key> : LocalizedValue<M, Key>;
};
