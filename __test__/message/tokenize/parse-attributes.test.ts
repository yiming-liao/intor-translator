import { describe, it, expect } from "vitest";
import { parseAttributes } from "@/message/tokenize/parse-attributes";

describe("parseAttributes", () => {
  it("parses a single attribute", () => {
    const result = parseAttributes(' id="x"');
    expect(result).toEqual({
      id: "x",
    });
  });

  it("parses multiple attributes", () => {
    const result = parseAttributes(' id="x" href="/pricing"');
    expect(result).toEqual({
      id: "x",
      href: "/pricing",
    });
  });

  it("allows empty attribute values", () => {
    const result = parseAttributes(' id=""');
    expect(result).toEqual({
      id: "",
    });
  });

  it("returns null for unquoted values", () => {
    const result = parseAttributes(" id=x");
    expect(result).toBeNull();
  });

  it("returns null for single-quoted values", () => {
    const result = parseAttributes(" id='x'");
    expect(result).toBeNull();
  });

  it("returns null for boolean attributes", () => {
    const result = parseAttributes(" disabled");
    expect(result).toBeNull();
  });

  it("returns null for mixed valid and invalid attributes", () => {
    const result = parseAttributes(' id="x" disabled');
    expect(result).toBeNull();
  });

  it("returns null when attribute syntax is malformed", () => {
    const result = parseAttributes(' id="x"foo="y"');
    expect(result).toBeNull();
  });

  it("returns null when extra characters are present", () => {
    const result = parseAttributes(' id="x" >');
    expect(result).toBeNull();
  });

  it("returns an empty object for an empty attribute string", () => {
    const result = parseAttributes("");
    expect(result).toEqual({});
  });
});
