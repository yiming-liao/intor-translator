/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TranslateContext } from "@/pipeline/types";
import { rura } from "rura";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { runTranslate } from "@/pipeline/run-translate";

describe("runTranslate", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should create a TranslateContext and call rura.run with provided hooks", () => {
    const hooks = [] as any[];

    const options = {
      hooks,
      messages: {
        en: { hello: "world" },
      },
      locale: "en",
      isLoading: false,
      translateConfig: {
        handlers: {},
      },
      key: "hello",
      replacements: { name: "John" },
    };

    const mockResult = {
      early: false,
      ctx: { finalMessage: "mocked" },
      output: undefined,
    };

    const runSpy = vi.spyOn(rura, "run").mockReturnValue(mockResult as any);

    const result = runTranslate(options as any);

    // rura.run is called correctly
    expect(runSpy).toHaveBeenCalledTimes(1);

    const [ctxArg, hooksArg] = runSpy.mock.calls[0];

    // hooks passed through
    expect(hooksArg).toBe(hooks);

    // context shape
    expect(ctxArg).toMatchObject<Partial<TranslateContext>>({
      messages: options.messages,
      locale: options.locale,
      isLoading: options.isLoading,
      key: options.key,
      replacements: options.replacements,
      config: options.translateConfig,
      meta: {},
      candidateLocales: [],
    });

    // return value is passed through
    expect(result).toBe(mockResult);
  });

  it("should always initialize meta and candidateLocales even if not provided", () => {
    const runSpy = vi
      .spyOn(rura, "run")
      .mockReturnValue({ early: false } as any);

    runTranslate({
      hooks: [],
      messages: {},
      locale: "en",
      isLoading: false,
      translateConfig: {},
      key: "any",
    } as any);

    const [ctxArg] = runSpy.mock.calls[0];

    expect((ctxArg as any).meta).toEqual({});
    expect((ctxArg as any).candidateLocales).toEqual([]);
  });
});
