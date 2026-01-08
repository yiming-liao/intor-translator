/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, afterEach } from "vitest";
import { translate } from "@/translators/methods/translate";
import * as runUtil from "@/translators/methods/utils/run-translate";

describe("translate", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns early output when pipeline exits early", () => {
    vi.spyOn(runUtil, "runTranslate").mockReturnValue({
      early: true,
      output: "early-result",
      ctx: {} as any,
    });
    const result = translate({
      hooks: [],
      messages: {},
      locale: "en",
      isLoading: false,
      translateConfig: {} as any,
      key: "hello",
    });
    expect(result).toBe("early-result");
  });

  it("returns ctx.finalMessage when pipeline completes normally", () => {
    vi.spyOn(runUtil, "runTranslate").mockReturnValue({
      early: false,
      ctx: {
        finalMessage: "final-result",
      } as any,
    });
    const result = translate({
      hooks: [],
      messages: {},
      locale: "en",
      isLoading: false,
      translateConfig: {} as any,
      key: "hello",
    });
    expect(result).toBe("final-result");
  });

  it("throws when pipeline completes without finalMessage", () => {
    vi.spyOn(runUtil, "runTranslate").mockReturnValue({
      early: false,
      ctx: {} as any,
    });
    expect(() =>
      translate({
        hooks: [],
        messages: {},
        locale: "en",
        isLoading: false,
        translateConfig: {} as any,
        key: "hello",
      }),
    ).toThrowError("Invariant violated: missing hook did not produce output");
  });
});
