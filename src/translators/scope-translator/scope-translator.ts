import type { ScopeTranslatorMethods, ScopeTranslatorOptions } from "./types";
import type { Locale, LocaleMessages, Replacement } from "@/types";
import type { LocalizedNodeKeys, ScopedLeafKeys } from "@/types/keys";
import { CoreTranslator } from "@/translators/core-translator";
import { getFullKey } from "@/translators/scope-translator/utils/get-full-key";
import { hasKey as hasKeyMethod } from "@/translators/methods/has-key";
import { translate } from "@/translators/methods/translate";

export class ScopeTranslator<
  M extends LocaleMessages | unknown = unknown,
  L extends keyof M | "union" = "union",
> extends CoreTranslator<M> {
  constructor(options: ScopeTranslatorOptions<M>) {
    super(options);
  }

  /** Create a scoped translator with a prefix key, providing `t` and `hasKey` for nested keys. */
  public scoped<PK extends LocalizedNodeKeys<M, L> | undefined = undefined>(
    preKey?: PK,
  ): PK extends string
    ? ScopeTranslatorMethods<M, L, ScopedLeafKeys<M, PK, L>>
    : ScopeTranslatorMethods<M, L> {
    return {
      hasKey: (key?: string, targetLocale?: Locale<M>): boolean => {
        const fullKey = getFullKey(preKey as string | undefined, key);
        return hasKeyMethod({
          messages: this._messages as Readonly<LocaleMessages>,
          locale: this._locale,
          key: fullKey as string,
          targetLocale,
        });
      },
      t: (key?: string, replacements?: Replacement): string => {
        const fullKey = getFullKey(preKey as string | undefined, key);
        return translate({
          hooks: this.hooks,
          messages: this._messages as Readonly<LocaleMessages>,
          locale: this._locale,
          isLoading: this._isLoading,
          translateConfig: this.translateConfig,
          key: fullKey as string,
          replacements,
        });
      },
    } as PK extends string
      ? ScopeTranslatorMethods<M, L, ScopedLeafKeys<M, PK, L>>
      : ScopeTranslatorMethods<M, L>;
  }
}
