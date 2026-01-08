import { runTranslate, type TranslateParams } from "./utils/run-translate";

/**
 *  Runs the translate pipeline and returns the final formatted message.
 */
export function translate<Result = string>(options: TranslateParams): Result {
  const { early, ctx, output } = runTranslate(options);
  if (early === true) return output as Result;
  return ctx.finalMessage as Result;
}
