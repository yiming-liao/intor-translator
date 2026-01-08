import type { CoreTranslatorOptions, TranslatorPlugin } from "./types";
import type { TranslateHook } from "@/pipeline/types";
import type { TranslateConfig } from "@/translators/core-translator/translate-config.types";
import type {
  Replacement,
  Locale,
  LocaleMessages,
  MessageValue,
} from "@/types";
import type { LocalizedLeafKeys } from "@/types/keys/localized-key";
import { rura } from "rura";
import { DEFAULT_HOOKS } from "@/pipeline";
import { BaseTranslator } from "@/translators/base-translator";
import { hasKey } from "@/translators/methods/has-key";
import { translate } from "@/translators/methods/translate";
import { translateRaw } from "@/translators/methods/translate-raw";

/**
 * CoreTranslator provides the default translation behavior
 * using the pipeline engine and built-in hooks.
 *
 * @template M - Shape of the messages object.
 * @template L - Locale selection strategy ("union" or specific locale keys).
 */
export class CoreTranslator<
  M extends LocaleMessages | unknown = unknown,
  L extends keyof M | "union" = "union",
> extends BaseTranslator<M> {
  /** User-provided options including messages, locale, and config. */
  protected translateConfig: TranslateConfig<M>;
  /** Active pipeline hooks applied during translation. */
  protected hooks: TranslateHook[] = [...DEFAULT_HOOKS];

  constructor(options: CoreTranslatorOptions<M>) {
    const { locale, messages, isLoading, plugins, ...translateConfig } =
      options;
    super({ locale, messages, isLoading });
    this.translateConfig = translateConfig;
    if (plugins) {
      for (const plugin of plugins) this.use(plugin);
    }
    this.sortHooks();
  }

  /** Sort hooks by order value (lower runs earlier). */
  private sortHooks() {
    this.hooks.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  /** Register a plugin or a raw pipeline hook. */
  public use(plugin: TranslatorPlugin | TranslateHook) {
    // Direct hook
    if ("run" in plugin) this.hooks.push(plugin);
    // Plugin with hooks
    else if ("hook" in plugin && plugin.hook) {
      const hooks = Array.isArray(plugin.hook) ? plugin.hook : [plugin.hook];
      this.hooks.push(...hooks);
    }
    this.sortHooks();
  }

  /** Outputs a debug overview of the active pipeline. */
  debugHooks() {
    return rura
      .createPipeline(this.hooks)
      .debugHooks(
        (hooks) => `🤖 Intor Translator pipeline (${hooks.length} hooks)`,
      );
  }

  /** Check if a key exists in the specified locale or current locale. */
  public hasKey = <K extends LocalizedLeafKeys<M, L>>(
    key: K,
    targetLocale?: Locale<M>,
  ): boolean => {
    return hasKey({
      messages: this._messages as Readonly<LocaleMessages>,
      locale: this._locale,
      key: key as string,
      targetLocale,
    });
  };

  /** Get the translated message for a key, with optional replacements. */
  public t = <
    Result = string,
    K extends LocalizedLeafKeys<M, L> = LocalizedLeafKeys<M, L>,
  >(
    key: K,
    replacements?: Replacement,
  ): Result => {
    return translate({
      hooks: this.hooks,
      messages: this._messages as Readonly<LocaleMessages>,
      locale: this._locale,
      isLoading: this._isLoading,
      translateConfig: this.translateConfig,
      key: key as string,
      replacements,
    });
  };

  /** Get the raw message value for a key without formatting or interpolation. */
  public tRaw = <K extends LocalizedLeafKeys<M, L> = LocalizedLeafKeys<M, L>>(
    key: K,
    replacements?: Replacement,
  ): MessageValue | undefined => {
    return translateRaw({
      hooks: this.hooks,
      messages: this._messages as Readonly<LocaleMessages>,
      locale: this._locale,
      isLoading: this._isLoading,
      translateConfig: this.translateConfig,
      key: key as string,
      replacements,
    });
  };
}
