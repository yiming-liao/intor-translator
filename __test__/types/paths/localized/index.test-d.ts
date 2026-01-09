/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  LocalizedLeafKeys,
  LocalizedLeafValue,
  LocalizedNodeKeys,
  MessageValue,
} from "../../../../dist";
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

expectType<"nested" | "nested.key" | "onlyInEn" | "diffValue">(
  null as unknown as LocalizedNodeKeys<Messages>,
);

// Empty Messages
expectType<never>(null as unknown as LocalizedNodeKeys<EmptyMessages>);

// Fallback
expectType<string>(null as unknown as LocalizedNodeKeys);

//---------------------------------------------------------------
// LocalizedLeafKeys
//---------------------------------------------------------------

expectType<"nested.key" | "onlyInEn" | "diffValue">(
  null as unknown as LocalizedLeafKeys<Messages>,
);

// Empty Messages
expectType<never>(null as unknown as LocalizedLeafKeys<EmptyMessages>);

// Fallback
expectType<string>(null as unknown as LocalizedLeafKeys);

//---------------------------------------------------------------
// LocalizedLeafValue
//---------------------------------------------------------------

expectType<string>(
  null as unknown as LocalizedLeafValue<Messages, "nested.key">,
);

// Empty Messages
expectType<never>(null as unknown as LocalizedLeafValue<EmptyMessages>);

// Fallback
expectType<MessageValue>(null as unknown as LocalizedLeafValue);
