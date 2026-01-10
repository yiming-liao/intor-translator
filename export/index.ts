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
  type ASTNode,
  type Renderer,
  type Attributes,
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
  // utils
  GeneratePaths,
  AtPath,
  IfLocaleMessages,
  IfMessageObject,
  // key
  Key,
  LocalizedKey,
  ScopedKey,
  // pre-key
  PreKey,
  LocalizedPreKey,
  // value
  Value,
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
