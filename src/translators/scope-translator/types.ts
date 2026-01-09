import type { CoreTranslatorOptions } from "../core-translator";
import type {
  Locale,
  LocalizedLeafKeys,
  LocaleMessages,
  LocalizedLeafValue,
  LocalizedReplacement,
} from "@/types";
import type { ScopedLeafKeys, ScopedLeafValue } from "@/types";

export type ScopeTranslatorOptions<M> = CoreTranslatorOptions<M>;

export type ScopeTranslatorMethods<
  M extends LocaleMessages | unknown = unknown,
  ReplacementSchema = unknown,
  PK extends string | undefined = undefined,
  K extends string = PK extends string
    ? ScopedLeafKeys<M, PK>
    : LocalizedLeafKeys<M>,
> = {
  hasKey: (key?: K, targetLocale?: Locale<M>) => boolean;

  t: <Key extends K>(
    key?: Key,
    ...replacementArgs: [
      LocalizedReplacement<
        ReplacementSchema,
        PK extends string ? `${PK}.${Key & string}` : Key // full dot-path key (e.g. "user.name")
      >?,
    ]
  ) => PK extends string
    ? ScopedLeafValue<M, PK, Key>
    : LocalizedLeafValue<M, Key>;
};
