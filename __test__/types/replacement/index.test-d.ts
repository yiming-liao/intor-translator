import type { LocalizedReplacement, ScopedReplacement } from "../../../dist";
import { expectType } from "tsd";

interface ReplacementSchema {
  "{locale}": {
    hello: { name: string };
    nested: { key: { count: number } };
  };
}

//---------------------------------------------------------------
// LocalizedReplacement
//---------------------------------------------------------------
expectType<{ name: string }>(
  null as unknown as LocalizedReplacement<ReplacementSchema, "hello">,
);

expectType<{ key: { count: number } }>(
  null as unknown as LocalizedReplacement<ReplacementSchema, "nested">,
);

expectType<never>(
  null as unknown as LocalizedReplacement<ReplacementSchema, "non-exist">,
);

//---------------------------------------------------------------
// ScopedReplacement
//---------------------------------------------------------------
expectType<{ count: number }>(
  null as unknown as ScopedReplacement<ReplacementSchema, "nested", "key">,
);
