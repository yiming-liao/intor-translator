import type { Locale } from "../../types";

/**
 * Options for initializing a translator
 *
 * @template M - type of messages object
 */
export interface BaseTranslatorOptions<M = unknown> {
  /**
   * Messages object for translations.
   * - Use `LocaleMessages` type to enable key inference for `hasKey` and `t`.
   */
  messages?: Readonly<M>;

  /**
   * Current locale key.
   * - If `messages` is typed as `LocaleMessages`, this can be inferred automatically.
   */
  locale: Locale<M>;

  /**
   * Indicates whether the translator is in a loading state.
   */
  isLoading?: boolean;
}
