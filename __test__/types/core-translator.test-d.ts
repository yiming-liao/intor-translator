/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { expectType } from "tsd";
import { CoreTranslator } from "@/translators/core-translator";

const messages = {
  "en-US": { hello: "world", a: { b: { c: "d" } }, more: { k: "v" } },
  "zh-TW": { hello: "world", a: { b: { c: "d" } } },
};
const locale = "en-US";
const withoutMessages = { locale } as const;
const withMessages = { locale, messages } as const;

//=====================================
// Locale: Inferred (Union)
//=====================================

// 1. No messages provided
const tr1 = new CoreTranslator(withoutMessages);
expectType<string>(null as unknown as Parameters<(typeof tr1)["t"]>[0]);

// 2. Messages provided (inference mode)
const tr2 = new CoreTranslator(withMessages);
expectType<"hello" | "a.b.c" | "more.k">(
  null as unknown as Parameters<(typeof tr2)["t"]>[0],
);

// 3. Explicitly opting out of inference
const tr3 = new CoreTranslator<unknown>(withMessages);
expectType<string>(null as unknown as Parameters<(typeof tr3)["t"]>[0]);

//=====================================
// Locale: Specified
//=====================================

// 4. Locale narrowed to en-US
const tr4 = new CoreTranslator<typeof messages, "en-US">(withMessages);
expectType<"hello" | "a.b.c" | "more.k">(
  null as unknown as Parameters<(typeof tr4)["t"]>[0],
);

// 5. Locale narrowed to zh-TW
const tr5 = new CoreTranslator<typeof messages, "zh-TW">(withMessages);
expectType<"hello" | "a.b.c">(
  null as unknown as Parameters<(typeof tr5)["t"]>[0],
);
