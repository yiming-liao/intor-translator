import type { TranslateContext } from "@/pipeline/types";
import type { HandlerContext } from "@/translators";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { missing } from "@/pipeline/hooks/missing";
import * as handlerUtil from "@/pipeline/utils/make-handler-context";

describe("missing", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should do nothing when rawMessage exists", () => {
    const ctx = {
      rawMessage: "already found",
      key: "hello",
      config: {},
    } as unknown as TranslateContext;

    const result = missing.run(ctx);

    expect(result).toBeUndefined();
  });

  it("should call missingHandler and return its result", () => {
    const mockSnapshot = { mock: true } as unknown as HandlerContext;
    const mockReturnValue = "handled-missing-msg";

    // mock snapshot builder
    const snapshotSpy = vi
      .spyOn(handlerUtil, "makeHandlerContext")
      .mockReturnValue(mockSnapshot);

    // mock handler
    const missingHandler = vi.fn().mockReturnValue(mockReturnValue);

    const ctx = {
      rawMessage: undefined,
      key: "home.title",
      config: {
        handlers: {
          missingHandler,
        },
      },
    } as unknown as TranslateContext;

    const result = missing.run(ctx);

    // handler must be called
    expect(missingHandler).toHaveBeenCalledWith(mockSnapshot);

    // snapshot must be created using whole ctx
    expect(snapshotSpy).toHaveBeenCalledWith(ctx);

    // hook return shape
    expect(result).toEqual({
      early: true,
      output: mockReturnValue,
    });
  });

  it("should return placeholder when no handler is provided", () => {
    const ctx = {
      rawMessage: undefined,
      key: "home.title",
      config: {
        placeholder: "N/A",
      },
    } as unknown as TranslateContext;

    const result = missing.run(ctx);

    expect(result).toEqual({
      early: true,
      output: "N/A",
    });
  });

  it("should fallback to key when no handler or placeholder exists", () => {
    const ctx = {
      rawMessage: undefined,
      key: "hello.world",
      config: {},
    } as unknown as TranslateContext;

    const result = missing.run(ctx);

    expect(result).toEqual({
      early: true,
      output: "hello.world",
    });
  });
});
