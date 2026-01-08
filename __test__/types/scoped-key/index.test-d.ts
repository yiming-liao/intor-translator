/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ScopedLeafKeys } from "../../../dist";
import { expectType } from "tsd";

const messages = {
  en: {
    preKey: {
      key: "value",
      onlyInEn: { a: { b: "c" } },
    },
  },
  zh: {
    preKey: {
      key: "value",
    },
  },
};
const emptyMessages = {} as const;

type Messages = typeof messages;
type EmptyMessages = typeof emptyMessages;
type A = ScopedLeafKeys<Messages, "preKey", "zh">;

// Union Mode
expectType<"key" | "onlyInEn.a.b">(
  null as unknown as ScopedLeafKeys<Messages, "preKey">,
);

// Locale Narrowing
expectType<"key" | "onlyInEn.a.b">(
  null as unknown as ScopedLeafKeys<Messages, "preKey", "en">,
);
expectType<"key">(null as unknown as ScopedLeafKeys<Messages, "preKey", "zh">);

// PreKey is leaf → should be never
expectType<never>(null as unknown as ScopedLeafKeys<Messages, "preKey.key">);

// Locale not existing
expectType<never>(
  // @ts-expect-error invalid locale
  null as unknown as ScopedLeafKeys<Messages, "preKey", "fr">,
);
