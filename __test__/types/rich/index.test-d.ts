import type {
  Attributes,
  LocalizedRich,
  Rich,
  ScopedRich,
} from "../../../dist";
import { expectType } from "tsd";

interface RichSchema {
  "{locale}": {
    link: { a: { href: string } };
    name: { strong: Attributes };
    preKey: { info: { input: { placeholder: string } } };
  };
}

//---------------------------------------------------------------
// LocalizedRich
//---------------------------------------------------------------
expectType<{ a: { href: string } }>(
  null as unknown as LocalizedRich<RichSchema, "link">,
);

expectType<{ strong: Attributes }>(
  null as unknown as LocalizedRich<RichSchema, "name">,
);

expectType<Rich>(null as unknown as LocalizedRich<RichSchema, "missing">);

expectType<Rich>(null as unknown as LocalizedRich<RichSchema, string>);

//---------------------------------------------------------------
// ScopedRich
//---------------------------------------------------------------
expectType<{ input: { placeholder: string } }>(
  null as unknown as ScopedRich<RichSchema, "preKey", "info">,
);

expectType<Rich>(
  null as unknown as ScopedRich<RichSchema, "preKey", "missing">,
);
