// run-translate
export { runTranslate, type TranslateParams } from "./run-translate";

// types
export type { TranslateContext, TranslateHook } from "./types";

// translate-config
export type {
  TranslateConfig,
  TranslateHandlers,
  FormatHandler,
  LoadingHandler,
  MissingHandler,
  HandlerContext,
} from "./translate-config";

// hooks
import {
  findMessage,
  format,
  interpolate,
  loading,
  missing,
  resolveLocales,
} from "./hooks";

export const DEFAULT_HOOKS = [
  resolveLocales,
  findMessage,
  loading,
  missing,
  format,
  interpolate,
];
