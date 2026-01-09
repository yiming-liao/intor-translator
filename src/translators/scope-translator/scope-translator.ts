import type { ScopeTranslatorMethods, ScopeTranslatorOptions } from "./types";
import type {
  Locale,
  LocaleMessages,
  LocalizedNodeKeys,
  Replacement,
} from "@/types";
import { CoreTranslator } from "../core-translator";
import { hasKey as hasKeyMethod } from "../methods/has-key";
import { translate } from "../methods/translate";
import { getFullKey } from "../scope-translator/utils/get-full-key";

export class ScopeTranslator<
  M extends LocaleMessages | unknown = unknown,
  ReplacementSchema = unknown,
> extends CoreTranslator<M, ReplacementSchema> {
  constructor(options: ScopeTranslatorOptions<M>) {
    super(options);
  }

  /** Create a scoped translator with a prefix key for resolving nested message paths. */
  public scoped<PK extends LocalizedNodeKeys<M> | undefined = undefined>(
    preKey?: PK,
  ): PK extends string
    ? ScopeTranslatorMethods<M, ReplacementSchema, PK>
    : ScopeTranslatorMethods<M, ReplacementSchema> {
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
      t: (key?: string, ...args: [Replacement?]) => {
        const fullKey = getFullKey(preKey as string | undefined, key);
        return translate({
          hooks: this.hooks,
          messages: this._messages as Readonly<LocaleMessages>,
          locale: this._locale,
          isLoading: this._isLoading,
          translateConfig: this.translateConfig,
          key: fullKey as string,
          replacements: args[0],
        });
      },
    } as PK extends string
      ? ScopeTranslatorMethods<M, ReplacementSchema, PK>
      : ScopeTranslatorMethods<M, ReplacementSchema>;
  }
}
