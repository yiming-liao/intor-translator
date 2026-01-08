import type { TranslateContext } from "@/pipeline/types";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { findMessage } from "@/pipeline/hooks/find-message";
import * as findUtil from "@/shared/utils/find-message-in-locales";

describe("findMessage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should resolve message and set both rawValue and rawString when value is string", () => {
    const mockResult = "Hello from mock";
    const spy = vi
      .spyOn(findUtil, "findMessageInLocales")
      .mockReturnValue(mockResult);

    const ctx = {
      messages: {
        en: { hello: "Hello" },
        zh: { hello: "你好" },
      },
      candidateLocales: ["zh", "en"],
      key: "hello",
      rawValue: undefined,
      rawString: undefined,
    } as unknown as TranslateContext;

    findMessage.run(ctx);

    expect(spy).toHaveBeenCalledWith({
      messages: ctx.messages,
      candidateLocales: ctx.candidateLocales,
      key: ctx.key,
    });

    expect(ctx.rawValue).toBe(mockResult);
    expect(ctx.rawString).toBe(mockResult);
  });

  it("should set rawValue but not rawString when value is non-string", () => {
    const mockResult = ["a", "b", "c"];
    vi.spyOn(findUtil, "findMessageInLocales").mockReturnValue(mockResult);

    const ctx = {
      messages: {
        en: { list: ["a", "b", "c"] },
      },
      candidateLocales: ["en"],
      key: "list",
      rawValue: undefined,
      rawString: "previousValue",
    } as unknown as TranslateContext;

    findMessage.run(ctx);

    expect(ctx.rawValue).toEqual(mockResult);
    expect(ctx.rawString).toBeUndefined();
  });

  it("should clear rawValue and rawString when util returns undefined", () => {
    vi.spyOn(findUtil, "findMessageInLocales").mockReturnValue(undefined);

    const ctx = {
      messages: {},
      candidateLocales: ["en"],
      key: "missingKey",
      rawValue: "previousValue",
      rawString: "previousString",
    } as unknown as TranslateContext;

    findMessage.run(ctx);

    expect(ctx.rawValue).toBeUndefined();
    expect(ctx.rawString).toBeUndefined();
  });
});
