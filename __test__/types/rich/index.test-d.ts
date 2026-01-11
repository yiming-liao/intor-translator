/* eslint-disable @typescript-eslint/no-empty-object-type */
import type {
  Attributes,
  LocalizedRich,
  Rich,
  ScopedRich,
} from "../../../dist";
import { expectType } from "tsd";

interface RichSchema {
  "{locale}": {
    link: { a: {} };
    name: { strong: Attributes };
    preKey: { info: { input: {} } };
  };
}

//---------------------------------------------------------------
// LocalizedRich
//---------------------------------------------------------------
expectType<{ a: {} }>(null as unknown as LocalizedRich<RichSchema, "link">);

expectType<{ strong: Attributes }>(
  null as unknown as LocalizedRich<RichSchema, "name">,
);

expectType<Rich>(null as unknown as LocalizedRich<RichSchema, "missing">);

expectType<Rich>(null as unknown as LocalizedRich<RichSchema, string>);

//---------------------------------------------------------------
// ScopedRich
//---------------------------------------------------------------
expectType<{ input: {} }>(
  null as unknown as ScopedRich<RichSchema, "preKey", "info">,
);

expectType<Rich>(
  null as unknown as ScopedRich<RichSchema, "preKey", "missing">,
);
