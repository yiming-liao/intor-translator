import type { CoreTranslatorOptions } from "@/translators/core-translator";
import type {
  Locale,
  Replacement,
  LocalizedLeafKeys,
  LocaleMessages,
  LocalizedLeafValue,
} from "@/types";
import type { ScopedLeafKeys, ScopedLeafValue } from "@/types";

export type ScopeTranslatorOptions<M> = CoreTranslatorOptions<M>;

export type ScopeTranslatorMethods<
  M extends LocaleMessages | unknown = unknown,
  L extends keyof M | "union" = "union",
  PK extends string | undefined = undefined,
  K extends string = PK extends string
    ? ScopedLeafKeys<M, PK, L>
    : LocalizedLeafKeys<M, L>,
> = {
  hasKey: (key?: K, targetLocale?: Locale<M>) => boolean;

  t: <Key extends K>(
    key?: Key,
    replacements?: Replacement,
  ) => PK extends string
    ? ScopedLeafValue<M, PK, Key, L>
    : LocalizedLeafValue<M, Key, L>;

  tRaw: <Key extends K>(
    key?: Key,
    replacements?: Replacement,
  ) => PK extends string
    ? ScopedLeafValue<M, PK, Key, L>
    : LocalizedLeafValue<M, Key, L>;
};
