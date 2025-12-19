/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { LocalizedNodeKeys, LocalizedLeafKeys } from "@/types";
import { expectType } from "tsd";

/**
 * =====================================
 * Test Messages
 * =====================================
 */
const messages = {
  en: {
    greeting: {
      morning: "morning",
      night: "night",
    },
    farewell: "bye",
  },
  zh: {
    greeting: {
      morning: "早安",
      evening: "晚上好",
    },
    farewell: "再見",
  },
} as const;

const emptyMessages = {} as const;

const singleLocale = {
  en: { hello: "hello" },
} as const;

/**
 * =====================================
 * 1. LocalizedLeafKeys — Union Mode
 * =====================================
 */
expectType<
  "greeting.morning" | "greeting.night" | "greeting.evening" | "farewell"
>(null as unknown as LocalizedLeafKeys<typeof messages>);

/**
 * =====================================
 * 2. LocalizedLeafKeys — Locale Narrowing
 * =====================================
 */
expectType<"greeting.morning" | "greeting.night" | "farewell">(
  null as unknown as LocalizedLeafKeys<typeof messages, "en">,
);

expectType<"greeting.morning" | "greeting.evening" | "farewell">(
  null as unknown as LocalizedLeafKeys<typeof messages, "zh">,
);

/**
 * =====================================
 * 3. LocalizedLeafKeys — Single Locale
 * =====================================
 */
expectType<"hello">(
  null as unknown as LocalizedLeafKeys<typeof singleLocale, "en">,
);

/**
 * =====================================
 * 4. LocalizedLeafKeys — Empty Messages
 * =====================================
 */
expectType<never>(null as unknown as LocalizedLeafKeys<typeof emptyMessages>);

/**
 * =====================================
 * 5. LocalizedLeafKeys — Fallback (no type)
 * =====================================
 */
expectType<string>(null as unknown as LocalizedLeafKeys);

/**
 * =====================================
 * 6. LocalizedNodeKeys — Union Mode
 * =====================================
 */
expectType<
  | "greeting"
  | "greeting.morning"
  | "greeting.night"
  | "greeting.evening"
  | "farewell"
>(null as unknown as LocalizedNodeKeys<typeof messages>);

/**
 * =====================================
 * 7. LocalizedNodeKeys — Locale Narrowing
 * =====================================
 */
expectType<"greeting" | "greeting.morning" | "greeting.night" | "farewell">(
  null as unknown as LocalizedNodeKeys<typeof messages, "en">,
);

expectType<"greeting" | "greeting.morning" | "greeting.evening" | "farewell">(
  null as unknown as LocalizedNodeKeys<typeof messages, "zh">,
);

/**
 * =====================================
 * 8. LocalizedNodeKeys — Single Locale
 * =====================================
 */
expectType<"hello">(
  null as unknown as LocalizedNodeKeys<typeof singleLocale, "en">,
);

/**
 * =====================================
 * 9. LocalizedNodeKeys — Empty Messages
 * =====================================
 */
expectType<never>(null as unknown as LocalizedNodeKeys<typeof emptyMessages>);

/**
 * =====================================
 * 10. LocalizedNodeKeys — Fallback
 * =====================================
 */
expectType<string>(null as unknown as LocalizedNodeKeys);
