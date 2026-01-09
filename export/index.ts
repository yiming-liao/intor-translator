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
  // replacement
  Replacement,
  LocalizedReplacement,
  // keys
  DefaultDepth,
  NodeKeys,
  LeafKeys,
  LeafValue,
  AtPath,
  LocalizedNodeKeys,
  LocalizedLeafKeys,
  LocalizedLeafValue,
  ScopedLeafKeys,
  ScopedLeafValue,
} from "@/types";
