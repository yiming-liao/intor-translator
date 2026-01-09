/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { expectType } from "tsd";
import { Translator as ScopeTranslator } from "../../../dist";

const messages = {
  "en-US": { hello: "world", a: { b: { c: "d" } }, more: { k: "v" } },
  "zh-TW": { hello: "world", a: { b: { c: "d" } } },
};
const locale = "en-US";
const withoutMessages = { locale } as const;
const withMessages = { locale, messages } as const;

// No messages provided (fallback to string)
{
  const translator = new ScopeTranslator(withoutMessages);
  const scoped = translator.scoped();
  expectType<string | undefined>(
    null as unknown as Parameters<(typeof scoped)["t"]>[0],
  );
}

// Messages provided (inference mode)
{
  const translator = new ScopeTranslator(withMessages);
  const scoped = translator.scoped();
  expectType<"hello" | "a.b.c" | "more.k" | undefined>(
    null as unknown as Parameters<(typeof scoped)["t"]>[0],
  );
}

// Explicitly opting out of inference
{
  const translator = new ScopeTranslator<unknown>(withMessages);
  const scoped = translator.scoped();
  expectType<string | undefined>(
    null as unknown as Parameters<(typeof scoped)["t"]>[0],
  );
}

// [With preKey] No messages provided
{
  const translator = new ScopeTranslator(withoutMessages);
  const scoped = translator.scoped("a");
  expectType<string | undefined>(
    null as unknown as Parameters<(typeof scoped)["t"]>[0],
  );
}

// [With preKey] Messages provided (inference mode)
{
  const translator = new ScopeTranslator(withMessages);
  const scoped = translator.scoped("a");
  expectType<"b.c" | undefined>(
    null as unknown as Parameters<(typeof scoped)["t"]>[0],
  );
}

// [With preKey] Explicitly opting out of inference
{
  const translator = new ScopeTranslator<unknown>(withMessages);
  const scoped = translator.scoped("a");
  expectType<string | undefined>(
    null as unknown as Parameters<(typeof scoped)["t"]>[0],
  );
}
