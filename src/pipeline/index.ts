export type { TranslateContext, TranslateHook } from "./types";

import { rura } from "rura";
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

rura.createPipeline(DEFAULT_HOOKS).debugHooks();
