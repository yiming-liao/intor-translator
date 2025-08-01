export { Locale, Message, Namespace, Replacement } from "./basic";

export { RichReplacement } from "./rich-replacement";

export {
  NestedMessage,
  MessageRecord,
  NamespaceMessages,
  LocaleNamespaceMessages,
  UnionLocaleMessages,
} from "./message-structure";

export { LocaleKey, StrictLocaleKey, FallbackLocalesMap } from "./locale";

export {
  NodeKeys,
  LeafKeys,
  UnionLocaleLeafKeys,
  ScopedLeafKeys,
  InferTranslatorKey,
} from "./nested-keys";

export { MessagesRef, LocaleRef, IsLoadingRef } from "./translator-refs";
