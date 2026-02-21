// translator
export {
  ScopeTranslator as Translator,
  type ScopeTranslatorOptions as TranslatorOptions,
  type ScopeTranslatorMethods as TranslatorMethods,
  // plugin
  type TranslatorPlugin,
} from "@/translators";

// pipeline
export type {
  TranslateContext,
  TranslateHook,
  // translate config / handlers
  TranslateConfig,
  TranslateHandlers,
  FormatHandler,
  LoadingHandler,
  MissingHandler,
  HandlerContext,
} from "@/pipeline";

// message
export {
  parseRichMessage,
  renderRichMessage,
  type Renderer,
  tokenize,
  type Token,
} from "@/message";

// types
export type {
  // locale
  Locale,
  FallbackLocalesMap,
  // messages
  MessageObject,
  MessageValue,
  LocaleMessages,
  // key
  LocalizedKey,
  ScopedKey,
  // pre-key
  LocalizedPreKey,
  // value
  LocalizedValue,
  ScopedValue,
  // replacement
  Replacement,
  LocalizedReplacement,
  ScopedReplacement,
  // rich
  Rich,
  LocalizedRich,
  ScopedRich,
} from "@/types";
