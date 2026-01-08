/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { LocalizedLeafKeys, LocalizedNodeKeys } from "../../../dist";
import { expectType } from "tsd";

const messages = {
  en: {
    nested: { key: "value" },
    onlyInEn: "hi",
  },
  zh: {
    nested: { key: "value" },
  },
};
const emptyMessages = {} as const;

type Messages = typeof messages;
type EmptyMessages = typeof emptyMessages;

//---------------------------------------------------------------
// LocalizedNodeKeys
//---------------------------------------------------------------

// Union Mode
expectType<"nested" | "nested.key" | "onlyInEn">(
  null as unknown as LocalizedNodeKeys<Messages>,
);

// Locale Narrowing
expectType<"nested" | "nested.key" | "onlyInEn">(
  null as unknown as LocalizedNodeKeys<Messages, "en">,
);
expectType<"nested" | "nested.key">(
  null as unknown as LocalizedNodeKeys<Messages, "zh">,
);

// Empty Messages
expectType<never>(null as unknown as LocalizedNodeKeys<EmptyMessages>);

// Fallback
expectType<string>(null as unknown as LocalizedNodeKeys);

//---------------------------------------------------------------
// LocalizedLeafKeys
//---------------------------------------------------------------

// Union Mode
expectType<"nested.key" | "onlyInEn">(
  null as unknown as LocalizedLeafKeys<Messages>,
);

// Locale Narrowing
expectType<"nested.key" | "onlyInEn">(
  null as unknown as LocalizedLeafKeys<Messages, "en">,
);
expectType<"nested.key">(null as unknown as LocalizedLeafKeys<Messages, "zh">);

// Empty Messages
expectType<never>(null as unknown as LocalizedLeafKeys<EmptyMessages>);

// Fallback
expectType<string>(null as unknown as LocalizedLeafKeys);
