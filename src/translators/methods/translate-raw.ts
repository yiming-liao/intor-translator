import type { MessageValue } from "@/types";
import { runTranslate, type TranslateParams } from "./utils/run-translate";

/**
 * Runs the translate pipeline and returns the raw message value.
 */
export function translateRaw(
  options: TranslateParams,
): MessageValue | undefined {
  const { ctx } = runTranslate(options);
  return ctx.rawValue;
}
