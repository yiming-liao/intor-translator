// translator
export {
  ScopeTranslator as Translator,
  type ScopeTranslatorOptions as TranslatorOptions,
  type ScopeTranslatorMethods as TranslatorMethods,
  // plugin
  type TranslatorPlugin,
  // translate config / handlers
  type TranslateConfig,
  type TranslateHandlers,
  type FormatHandler,
  type LoadingHandler,
  type MissingHandler,
  type HandlerContext,
} from "@/translators";

// pipeline
export type { TranslateContext, TranslateHook } from "@/pipeline";

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
