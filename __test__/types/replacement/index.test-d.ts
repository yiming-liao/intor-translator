import type {
  LocalizedReplacement,
  Replacement,
  ScopedReplacement,
} from "../../../dist";
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

expectType<Replacement>(
  null as unknown as LocalizedReplacement<ReplacementSchema, "missing">,
);

expectType<Replacement>(
  null as unknown as LocalizedReplacement<
    { "{locale}": { hello: string } },
    "hello"
  >,
);

expectType<Replacement>(
  null as unknown as LocalizedReplacement<ReplacementSchema, string>,
);

//---------------------------------------------------------------
// ScopedReplacement
//---------------------------------------------------------------
expectType<{ count: number }>(
  null as unknown as ScopedReplacement<ReplacementSchema, "nested", "key">,
);

expectType<Replacement>(
  null as unknown as ScopedReplacement<ReplacementSchema, "nested", "missing">,
);
