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
} from "@/message";

// types
export type {
  // locale
  Locale,
  FallbackLocalesMap,
  // messages
  NestedMessage,
  LocaleMessages,
  LocalizedMessagesUnion,
  // replacement
  Replacement,
  // keys
  DefaultDepth,
  NodeKeys,
  LeafKeys,
  LocalizedNodeKeys,
  LocalizedLeafKeys,
  ScopedLeafKeys,
} from "@/types";
