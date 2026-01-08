/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { LeafKeys, NodeKeys } from "../../../dist";
import { expectType } from "tsd";

const messages = {
  string: "",
  number: 123,
  boolean: true,
  null: null,
  array: [],
  nested: { key: "value" },
};
const emptyMessages = {};

type Messages = typeof messages;
type EmptyMessages = typeof emptyMessages;

//---------------------------------------------------------------
// NodeKeys: all dot-separated keys
//---------------------------------------------------------------
expectType<
  "string" | "number" | "boolean" | "null" | "array" | "nested" | "nested.key"
>(null as unknown as NodeKeys<Messages>);

expectType<never>(null as unknown as NodeKeys<EmptyMessages>);

//---------------------------------------------------------------
// LeafKeys: only leaf keys
//---------------------------------------------------------------
expectType<"string" | "number" | "boolean" | "null" | "array" | "nested.key">(
  null as unknown as LeafKeys<Messages>,
);

expectType<never>(null as unknown as LeafKeys<EmptyMessages>);

//---------------------------------------------------------------
// Exceptions
//---------------------------------------------------------------
type NoneObject = string;
type SymbolKeyObj = { [Symbol.iterator]: { str: string } };
expectType<never>(null as unknown as NodeKeys<NoneObject>);
expectType<never>(null as unknown as LeafKeys<NoneObject>);
expectType<never>(null as unknown as NodeKeys<SymbolKeyObj>);
expectType<never>(null as unknown as LeafKeys<SymbolKeyObj>);
