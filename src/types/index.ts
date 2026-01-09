// locale
export type { Locale, FallbackLocalesMap } from "./locale";

// messages
export type { MessageObject, MessageValue, LocaleMessages } from "./messages";

// replacement
export type { Replacement, LocalizedReplacement } from "./replacement";

// keys
export type {
  // base
  DefaultDepth,
  NodeKeys,
  LeafKeys,
  LeafValue,
  AtPath,
  // localized
  LocalizedNodeKeys,
  LocalizedLeafKeys,
  LocalizedLeafValue,
  // scoped
  ScopedLeafKeys,
  ScopedLeafValue,
} from "./paths";
