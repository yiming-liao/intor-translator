import type { TranslateOptions } from "@/translator-methods/translate";
import type { LocaleNamespaceMessages, Replacement } from "@/types";
import { findMessageInLocales } from "@/utils/find-message-in-locales";
import { replaceValues } from "@/utils/replace-values";
import { resolveLocalesToTry } from "@/utils/resolve-locales-to-try";

export const translate = <M, Result = string>({
  messagesRef,
  localeRef,
  isLoadingRef,
  translateConfig,
  key,
  replacements,
}: TranslateOptions<M>): Result => {
  const messages = messagesRef.current as LocaleNamespaceMessages;
  const locale = localeRef.current;

  if (!messages) {
    throw new Error("[intor-translator] 'messages' is required");
  }
  if (!locale) {
    throw new Error("[intor-translator] 'locale' is required");
  }

  const isLoading = isLoadingRef.current;
  const {
    fallbackLocales,
    loadingMessage,
    placeholder,
    handlers = {},
  } = translateConfig;
  const { formatMessage, onLoading, onMissing } = handlers;

  const localesToTry = resolveLocalesToTry(locale, fallbackLocales);
  const message = findMessageInLocales({ messages, localesToTry, key });

  // Check if it's loading dynamic messages
  if (isLoading) {
    // Handle loading state with provided handler or fallback message
    if (onLoading) {
      return onLoading({
        key,
        locale,
        replacements,
      }) as Result;
    }

    // Return loadingMessage if provided from defined config
    if (loadingMessage) {
      return loadingMessage as Result;
    }
  }

  // If no message found, handle accordingly
  if (message === undefined || message === null) {
    if (onMissing) {
      return onMissing({ key, locale, replacements }) as Result;
    }

    // Return placeholder if provided from defined config
    if (placeholder !== undefined && placeholder !== null) {
      return placeholder as Result;
    }

    // Return the key if no message is found
    return key as Result;
  }

  // If a message is found, apply message formatter or replace values (Rich replacement)
  if (formatMessage) {
    return formatMessage({ message, key, locale, replacements }) as Result;
  }
  // Apply replacements if provided (Basic replacement)
  else {
    return replacements
      ? (replaceValues(message, replacements as Replacement) as Result)
      : (message as Result);
  }
};
