/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import { ScopeTranslator } from "@/translators";

describe("translate pipeline (tRaw smoke test)", () => {
  it("should resolve raw message values of all MessageValue types", () => {
    const messages = {
      en: {
        text: "Hello world", // string
        count: 42, // number
        enabled: true, // boolean
        empty: null, // null
        list: ["a", "b", "c"], // array
        nested: {
          value: "nested value", // string (nested)
          flags: [true, false], // array (nested)
        },
      },
    } as const;

    const { tRaw } = new ScopeTranslator({
      locale: "en",
      messages,
    });

    // Primitive values
    expect(tRaw("text")).toBe("Hello world");
    expect(tRaw("count")).toBe(42);
    expect(tRaw("enabled")).toBe(true);
    expect(tRaw("empty")).toBeNull();

    // Array
    expect(tRaw("list")).toEqual(["a", "b", "c"]);

    // Nested object
    expect(tRaw("nested" as any)).toEqual({
      value: "nested value",
      flags: [true, false],
    });
    expect(tRaw("nested.value")).toBe("nested value");
    expect(tRaw("nested.flags")).toEqual([true, false]);
  });

  it("should return undefined when key does not exist", () => {
    const messages = {
      en: {
        a: "b",
      },
    } as const;
    const { tRaw } = new ScopeTranslator({
      locale: "en",
      messages,
    });
    expect(tRaw("missing" as any)).toBeUndefined();
  });

  it("should not return key string on missing (no string-world fallback)", () => {
    const messages = {
      en: {},
    } as const;
    const { tRaw } = new ScopeTranslator({
      locale: "en",
      messages,
    });
    const result = tRaw("count" as never);
    expect(result).toBeUndefined();
  });
});
