/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ScopedLeafKeys, ScopedLeafValue } from "../../../../dist";
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

type Messages = typeof messages;

//---------------------------------------------------------------
// ScopedLeafKeys
//---------------------------------------------------------------

expectType<"key" | "onlyInEn.a.b" | "diffValue">(
  null as unknown as ScopedLeafKeys<Messages, "preKey">,
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

expectType<string>(
  null as unknown as ScopedLeafValue<Messages, "preKey", "key">,
);

// PreKey is leaf → should be never
expectType<never>(
  null as unknown as ScopedLeafValue<Messages, "preKey", "preKey.key">,
);
