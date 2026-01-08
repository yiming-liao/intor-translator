import type { MessageValue } from "@/types";
import { runTranslate, type TranslateParams } from "./utils/run-translate";

/**
 * Runs the translate pipeline and returns the raw message value.
 */
export function translateRaw(options: TranslateParams): MessageValue {
  const { ctx } = runTranslate(options);
  if (ctx.rawValue === undefined) {
    throw new Error("Invariant violated: missing hook did not produce output");
  }
  return ctx.rawValue;
}
