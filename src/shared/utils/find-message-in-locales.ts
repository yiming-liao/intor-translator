import type { LocaleMessages } from "@/types";

interface FindMessageInLocalesOptions {
  messages: LocaleMessages;
  candidateLocales: string[];
  key: string;
}

/**
 * Finds the first available string message for a given key across a list of locales.
 *
 * @example
 * ```ts
 * const messages = {
 *   en: { home: { title: "Welcome" } },
 *   zh: { home: { title: "歡迎" } },
 * };
 *
 * findMessageInLocales({
 *   messages,
 *   candidateLocales: ["en", "zh"],
 *   key: "home.title",
 * });
 * // => "Welcome"
 * ```
 */
export const findMessageInLocales = ({
  messages,
  candidateLocales,
  key,
}: FindMessageInLocalesOptions): string | undefined => {
  for (const locale of candidateLocales) {
    const localeMessages = messages[locale];
    if (!localeMessages) continue;

    let candidate: unknown = localeMessages;
    const keys = key.split(".");

    for (const k of keys) {
      if (candidate && typeof candidate === "object" && k in candidate) {
        candidate = (candidate as Record<string, unknown>)[k];
      } else {
        candidate = undefined;
        break;
      }
    }

    if (typeof candidate === "string") return candidate;
  }
};
