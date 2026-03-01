import type { TranslateConfig, TranslateHook } from "../../pipeline";
import type { BaseTranslatorOptions } from "../base-translator";

/**
 * Options for initializing a `CoreTranslator` instance.
 *
 * Extends the base runtime options with translation behavior
 * configuration and pipeline extensions.
 *
 * @public
 */
export interface CoreTranslatorOptions<M>
  extends BaseTranslatorOptions<M>,
    TranslateConfig<M> {
  /** Optional plugins or raw hooks to extend the translation pipeline. */
  plugins?: Array<TranslatorPlugin | TranslateHook>;
}

/**
 * A plugin contributing one or more hooks
 * to the translation pipeline.
 *
 * Acts as a structural wrapper around `TranslateHook`.
 *
 * @public
 */
export interface TranslatorPlugin {
  /** Optional name for debugging or ordering hints. */
  name?: string;
  /** One or multiple hooks contributed by this plugin. */
  hook?: TranslateHook | TranslateHook[];
}
