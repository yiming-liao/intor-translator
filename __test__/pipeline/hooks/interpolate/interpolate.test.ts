import type { TranslateContext } from "@/pipeline/types";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { interpolate } from "@/pipeline/hooks/interpolate/interpolate";
import * as interpUtil from "@/pipeline/hooks/interpolate/replace-values";

describe("interpolate", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should use formattedMessage when available", () => {
    const ctx = {
      rawString: "raw",
      formattedMessage: "formatted",
      replacements: undefined,
      finalMessage: undefined,
    } as unknown as TranslateContext;

    interpolate.run(ctx);

    expect(ctx.finalMessage).toBe("formatted");
  });

  it("should fallback to rawString when formattedMessage is not provided", () => {
    const ctx = {
      rawString: "raw-only",
      formattedMessage: undefined,
      replacements: undefined,
      finalMessage: undefined,
    } as unknown as TranslateContext;

    interpolate.run(ctx);

    expect(ctx.finalMessage).toBe("raw-only");
  });

  it("should call replaceValues when message is string and replacements exist", () => {
    const mockOutput = "Hello John";
    const replaceSpy = vi
      .spyOn(interpUtil, "replaceValues")
      .mockReturnValue(mockOutput);

    const ctx = {
      rawString: "Hello {name}",
      formattedMessage: undefined,
      replacements: { name: "John" },
      finalMessage: undefined,
    } as unknown as TranslateContext;

    interpolate.run(ctx);

    expect(replaceSpy).toHaveBeenCalledWith("Hello {name}", { name: "John" });
    expect(ctx.finalMessage).toBe(mockOutput);
  });

  it("should not call replaceValues if message is not a string", () => {
    const replaceSpy = vi.spyOn(interpUtil, "replaceValues");

    const ctx = {
      rawString: 123,
      formattedMessage: undefined,
      replacements: { name: "John" },
      finalMessage: undefined,
    } as unknown as TranslateContext;

    interpolate.run(ctx);

    expect(replaceSpy).not.toHaveBeenCalled();
    expect(ctx.finalMessage).toBe(123);
  });

  it("should not call replaceValues if replacements is missing", () => {
    const replaceSpy = vi.spyOn(interpUtil, "replaceValues");

    const ctx = {
      rawString: "Hello {name}",
      formattedMessage: undefined,
      replacements: undefined,
      finalMessage: undefined,
    } as unknown as TranslateContext;

    interpolate.run(ctx);

    expect(replaceSpy).not.toHaveBeenCalled();
    expect(ctx.finalMessage).toBe("Hello {name}");
  });
});
