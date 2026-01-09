export { runTranslate, type TranslateParams } from "./run-translate";

export type { TranslateContext, TranslateHook } from "./types";

export type {
  TranslateConfig,
  TranslateHandlers,
  FormatHandler,
  LoadingHandler,
  MissingHandler,
  HandlerContext,
} from "./translate-config";

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
