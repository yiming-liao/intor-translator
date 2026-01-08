export type { TranslateContext, TranslateHook } from "./types";

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
