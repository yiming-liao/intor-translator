// translator
export {
  ScopeTranslator as Translator,
  type ScopeTranslatorOptions as TranslatorOptions,
  type ScopeTranslatorMethods as TranslatorMethods,
  // plugin
  type TranslatorPlugin,
} from "../src/translators";

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
} from "../src/pipeline";

// message
export {
  parseRichMessage,
  renderRichMessage,
  type Renderer,
  tokenize,
  type Token,
} from "../src/message";

// types
export type {
  // locale
  Locale,
  FallbackLocalesMap,

  // messages
  MessagePrimitive,
  MessageArray,
  MessageObject,
  MessageValue,
  MessageLeaf,
  LocaleMessages,

  // key
  Key,
  LocalizedKey,
  ScopedKey,

  // pre-key
  PreKey,
  LocalizedPreKey,

  // replacement
  Replacement,
  LocalizedReplacement,
  ScopedReplacement,

  // rich
  Rich,
  LocalizedRich,
  ScopedRich,

  // value
  Value,
  LocalizedValue,
  ScopedValue,

  // utils
  IsAny,
  IsNever,
  IsRuntime,
  IfMessageObject,
  IfLocaleMessages,
  DepthDecrement,
  ExpandPath,
  GeneratePaths,
  AtPath,
} from "../src/types";
