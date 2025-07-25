import type { Replacement } from "@/types";

/**
 * Replaces placeholders in a message string with corresponding values from the given parameters.
 *
 * @example
 * const message = "Hello, {user.name}! You have {notifications.count} new messages.";
 * const params = { user: { name: "Alice" }, notifications: { count: 5 } };
 * const result = replaceValues(message, params);
 * // result: "Hello, Alice! You have 5 new messages."
 */
export const replaceValues = (
  message: string,
  params?: Replacement,
): string => {
  // Check if params is a valid object (excluding null and undefined)
  if (
    !params ||
    typeof params !== "object" ||
    Object.keys(params).length === 0
  ) {
    return message;
  }

  // Deep replace
  const replaced = message.replace(/{([^}]+)}/g, (match, key) => {
    const keys = key.split(".");
    let value: Replacement | string | number = params;

    for (const k of keys) {
      // If value is undefined or null, return the original match
      if (value == null || typeof value !== "object" || !(k in value)) {
        return match;
      }

      // Move to the next nested level
      value = (value as Replacement)[k];
    }

    return typeof value === "string" || typeof value === "number"
      ? String(value)
      : match;
  });

  return replaced;
};
