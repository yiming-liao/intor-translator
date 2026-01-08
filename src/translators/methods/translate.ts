import type { MessageValue } from "@/types";
import { runTranslate, type TranslateParams } from "./utils/run-translate";

/**
 *  Runs the translate pipeline and returns the final formatted message.
 */
export function translate(options: TranslateParams): MessageValue {
  const { early, ctx, output } = runTranslate(options);
  if (early === true) return output;
  if (ctx.finalMessage === undefined) {
    throw new Error("Invariant violated: missing hook did not produce output");
  }
  return ctx.finalMessage;
}
