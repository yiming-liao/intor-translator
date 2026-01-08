/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  LocalizedLeafKeys,
  LocalizedLeafValue,
  LocalizedNodeKeys,
  MessageValue,
} from "../../../dist";
import { expectType } from "tsd";

const messages = {
  en: {
    nested: { key: "value" },
    onlyInEn: "hi",
    diffValue: true,
  },
  zh: {
    nested: { key: "value" },
    diffValue: 123,
  },
};
const emptyMessages = {} as const;

type Messages = typeof messages;
type EmptyMessages = typeof emptyMessages;

//---------------------------------------------------------------
// LocalizedNodeKeys
//---------------------------------------------------------------

// Union Mode
expectType<"nested" | "nested.key" | "onlyInEn" | "diffValue">(
  null as unknown as LocalizedNodeKeys<Messages>,
);

// Locale Narrowing
expectType<"nested" | "nested.key" | "onlyInEn" | "diffValue">(
  null as unknown as LocalizedNodeKeys<Messages, "en">,
);
expectType<"nested" | "nested.key" | "diffValue">(
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
expectType<"nested.key" | "onlyInEn" | "diffValue">(
  null as unknown as LocalizedLeafKeys<Messages>,
);

// Locale Narrowing
expectType<"nested.key" | "onlyInEn" | "diffValue">(
  null as unknown as LocalizedLeafKeys<Messages, "en">,
);
expectType<"nested.key" | "diffValue">(
  null as unknown as LocalizedLeafKeys<Messages, "zh">,
);

// Empty Messages
expectType<never>(null as unknown as LocalizedLeafKeys<EmptyMessages>);

// Fallback
expectType<string>(null as unknown as LocalizedLeafKeys);

//---------------------------------------------------------------
// LocalizedLeafValue
//---------------------------------------------------------------

// Union Mode
expectType<string>(
  null as unknown as LocalizedLeafValue<Messages, "nested.key">,
);

// Locale Narrowing
expectType<boolean>(
  null as unknown as LocalizedLeafValue<Messages, "diffValue", "en">,
);
expectType<number>(
  null as unknown as LocalizedLeafValue<Messages, "diffValue", "zh">,
);

// Empty Messages
expectType<never>(null as unknown as LocalizedLeafValue<EmptyMessages>);

// Fallback
expectType<MessageValue>(null as unknown as LocalizedLeafValue);
