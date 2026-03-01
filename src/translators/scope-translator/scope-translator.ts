import type { ScopeTranslatorMethods, ScopeTranslatorOptions } from "./types";
import type {
  Locale,
  LocaleMessages,
  LocalizedPreKey,
  Replacement,
} from "../../types";
import { CoreTranslator } from "../core-translator";
import { hasKey as hasKeyMethod } from "../methods/has-key";
import { translate } from "../methods/translate";
import { getFullKey } from "../scope-translator/utils/get-full-key";

/**
 * The scoped translator implementation.
 *
 * Adds key prefix composition without changing translation behavior.
 *
 * @public
 */
export class ScopeTranslator<
  M = unknown,
  ReplacementShape = unknown,
> extends CoreTranslator<M, ReplacementShape> {
  constructor(options: ScopeTranslatorOptions<M>) {
    super(options);
  }

  /** Create a scoped translator with a prefix key for resolving nested message paths. */
  public scoped<PK extends LocalizedPreKey<M> | undefined = undefined>(
    preKey?: PK,
  ): PK extends string
    ? ScopeTranslatorMethods<M, ReplacementShape, PK>
    : ScopeTranslatorMethods<M, ReplacementShape> {
    return {
      hasKey: (key?: string, targetLocale?: Locale<M>): boolean => {
        const fullKey = getFullKey(preKey, key);
        return hasKeyMethod({
          messages: this._messages as Readonly<LocaleMessages>,
          locale: this._locale,
          key: fullKey,
          ...(targetLocale !== undefined && { targetLocale }),
        });
      },
      t: (key?: string, replacements?: Replacement) => {
        const fullKey = getFullKey(preKey, key);
        return translate({
          hooks: this.hooks,
          messages: this._messages as Readonly<LocaleMessages>,
          locale: this._locale,
          isLoading: this._isLoading,
          translateConfig: this.translateConfig,
          key: fullKey,
          ...(replacements !== undefined && { replacements }),
        });
      },
    } as PK extends string
      ? ScopeTranslatorMethods<M, ReplacementShape, PK>
      : ScopeTranslatorMethods<M, ReplacementShape>;
  }
}
