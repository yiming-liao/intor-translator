/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ScopedLeafKeys, ScopedLeafValue } from "../../../dist";
import { expectType } from "tsd";

const messages = {
  en: {
    preKey: {
      key: "value",
      onlyInEn: { a: { b: "c" } },
      diffValue: true,
    },
  },
  zh: {
    preKey: {
      key: "value",
      diffValue: 123,
    },
  },
};
const emptyMessages = {} as const;

type Messages = typeof messages;
type EmptyMessages = typeof emptyMessages;
type A = ScopedLeafKeys<Messages, "preKey", "zh">;

//---------------------------------------------------------------
// ScopedLeafKeys
//---------------------------------------------------------------

// Union Mode
expectType<"key" | "onlyInEn.a.b" | "diffValue">(
  null as unknown as ScopedLeafKeys<Messages, "preKey">,
);

// Locale Narrowing
expectType<"key" | "onlyInEn.a.b" | "diffValue">(
  null as unknown as ScopedLeafKeys<Messages, "preKey", "en">,
);
expectType<"key" | "diffValue">(
  null as unknown as ScopedLeafKeys<Messages, "preKey", "zh">,
);

// PreKey is leaf → should be never
expectType<never>(null as unknown as ScopedLeafKeys<Messages, "preKey.key">);

// Locale not existing
expectType<never>(
  // @ts-expect-error invalid locale
  null as unknown as ScopedLeafKeys<Messages, "preKey", "fr">,
);

//---------------------------------------------------------------
// ScopedLeafValue
//---------------------------------------------------------------

// Union Mode
expectType<string>(
  null as unknown as ScopedLeafValue<Messages, "preKey", "key">,
);

// Locale Narrowing
expectType<boolean>(
  null as unknown as ScopedLeafValue<Messages, "preKey", "diffValue", "en">,
);
expectType<number>(
  null as unknown as ScopedLeafValue<Messages, "preKey", "diffValue", "zh">,
);

// PreKey is leaf → should be never
expectType<never>(
  null as unknown as ScopedLeafValue<Messages, "preKey", "preKey.key">,
);
