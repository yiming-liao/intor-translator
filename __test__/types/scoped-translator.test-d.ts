/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { expectType } from "tsd";
import { ScopeTranslator } from "@/translators";

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

// 1. No messages provided |
const tr1 = new ScopeTranslator(withoutMessages);
const scoped1 = tr1.scoped();
expectType<string | undefined>(
  null as unknown as Parameters<(typeof scoped1)["t"]>[0],
);

// 2. Messages provided (inference mode)
const tr2 = new ScopeTranslator(withMessages);
const scoped2 = tr2.scoped();
expectType<"hello" | "a.b.c" | "more.k" | undefined>(
  null as unknown as Parameters<(typeof scoped2)["t"]>[0],
);

// 3. Explicitly opting out of inference
const tr3 = new ScopeTranslator<unknown>(withMessages);
const scoped3 = tr3.scoped();
expectType<string | undefined>(
  null as unknown as Parameters<(typeof scoped3)["t"]>[0],
);

// 4. [With preKey] No messages provided
const tr4 = new ScopeTranslator(withoutMessages);
const scoped4 = tr4.scoped("a");
expectType<string | undefined>(
  null as unknown as Parameters<(typeof scoped4)["t"]>[0],
);

// 5. [With preKey] Messages provided (inference mode)
const tr5 = new ScopeTranslator(withMessages);
const scoped5 = tr5.scoped("a");
expectType<"b.c" | undefined>(
  null as unknown as Parameters<(typeof scoped5)["t"]>[0],
);

// 6. [With preKey] Explicitly opting out of inference
const tr6 = new ScopeTranslator<unknown>(withMessages);
const scoped6 = tr6.scoped("a");
expectType<string | undefined>(
  null as unknown as Parameters<(typeof scoped6)["t"]>[0],
);

//=====================================
// Locale: Specified
//=====================================

// 7. Locale narrowed to en-US
const tr7 = new ScopeTranslator<typeof messages, "en-US">(withMessages);
const scoped7 = tr7.scoped();
expectType<"hello" | "a.b.c" | "more.k" | undefined>(
  null as unknown as Parameters<(typeof scoped7)["t"]>[0],
);

// 8. Locale narrowed to zh-TW
const tr8 = new ScopeTranslator<typeof messages, "zh-TW">(withMessages);
const scoped8 = tr8.scoped();
expectType<"hello" | "a.b.c" | undefined>(
  null as unknown as Parameters<(typeof scoped8)["t"]>[0],
);

// 9. Locale narrowed to en-US with locale-specific keys
const tr9 = new ScopeTranslator<typeof messages, "en-US">(withMessages);
const scoped9 = tr9.scoped("more");
expectType<"k" | undefined>(
  null as unknown as Parameters<(typeof scoped9)["t"]>[0],
);
