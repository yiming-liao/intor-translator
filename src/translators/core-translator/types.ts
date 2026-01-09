import type { BaseTranslatorOptions } from "../base-translator";
import type { TranslateHook, TranslateConfig } from "@/pipeline";

export interface CoreTranslatorOptions<M>
  extends BaseTranslatorOptions<M>,
    TranslateConfig<M> {
  /** Optional plugins or raw hooks to extend the translation pipeline */
  plugins?: Array<TranslatorPlugin | TranslateHook>;
}

export interface TranslatorPlugin {
  /** Optional name for debugging or ordering hints */
  name?: string;
  /** One or multiple hooks contributed by this plugin */
  hook?: TranslateHook | TranslateHook[];
}
