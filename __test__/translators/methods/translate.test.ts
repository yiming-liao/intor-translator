/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from "vitest";
import { translate } from "@/translators/methods/translate";
import * as runUtil from "@/translators/methods/utils/run-translate";

describe("translate", () => {
  it("should return early output when pipeline exits early", () => {
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

  it("should return ctx.finalMessage when pipeline completes normally", () => {
    vi.spyOn(runUtil, "runTranslate").mockReturnValue({
      early: false,
      output: undefined,
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
});
