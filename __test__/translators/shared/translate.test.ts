/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TranslateHook } from "@/pipeline/types";
import * as ruraPackage from "rura";
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  translate,
  type TranslateOptions,
} from "@/translators/shared/translate";

describe("translate()", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should run hooks and return finalMessage when no early return", () => {
    // Mock rura.run behavior
    const runSpy = vi.spyOn(ruraPackage.rura, "run").mockReturnValue({
      early: false,
      ctx: {
        finalMessage: "hello-final",
      },
    });

    const options: TranslateOptions = {
      hooks: [],
      messages: { en: { hello: "Hello" } },
      locale: "en",
      isLoading: false,
      translateConfig: {},
      key: "hello",
      replacements: undefined,
    };

    const result = translate(options);

    expect(result).toBe("hello-final");

    // rura.run should receive merged context
    expect(runSpy).toHaveBeenCalledTimes(1);
    const [receivedCtx, receivedHooks] = runSpy.mock.calls[0];

    expect(receivedHooks).toEqual(options.hooks);

    // essential fields in context
    expect((receivedCtx as any).locale).toBe("en");
    expect((receivedCtx as any).key).toBe("hello");
    expect((receivedCtx as any).config).toBe(options.translateConfig);
    expect((receivedCtx as any).candidateLocales).toEqual([]);
    expect((receivedCtx as any).meta).toEqual({});
  });

  it("should return output when early === true", () => {
    const runSpy = vi.spyOn(ruraPackage.rura, "run").mockReturnValue({
      early: true,
      output: "early-result",
      ctx: {},
    });

    const options: TranslateOptions = {
      hooks: [],
      messages: {},
      locale: "en",
      isLoading: false,
      translateConfig: {},
      key: "unused",
    };

    const result = translate(options);

    expect(result).toBe("early-result");
    expect(runSpy).toHaveBeenCalledTimes(1);
  });

  it("should pass full TranslateContext into rura.run", () => {
    const runSpy = vi.spyOn(ruraPackage.rura, "run").mockReturnValue({
      early: false,
      ctx: { finalMessage: "meta-test" },
    });

    const options: TranslateOptions = {
      hooks: [{ name: "test", run: () => {} }] as TranslateHook[],
      messages: { en: {} },
      locale: "en",
      isLoading: true,
      translateConfig: { loadingMessage: "Loading…" },
      key: "k",
      replacements: { user: "Yiming" },
    };

    translate(options);

    const [receivedCtx] = runSpy.mock.calls[0];

    expect((receivedCtx as any).messages).toBe(options.messages);
    expect((receivedCtx as any).locale).toBe("en");
    expect((receivedCtx as any).isLoading).toBe(true);
    expect((receivedCtx as any).config).toBe(options.translateConfig);
    expect((receivedCtx as any).key).toBe("k");
    expect((receivedCtx as any).replacements).toEqual({ user: "Yiming" });

    // auto-added fields
    expect((receivedCtx as any).candidateLocales).toEqual([]);
    expect((receivedCtx as any).meta).toEqual({});
  });
});
