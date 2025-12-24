import type { TranslateHook } from "@/pipeline/types";
import type { CoreTranslatorOptions } from "@/translators/core-translator";
import type { TranslatorPlugin } from "@/translators/core-translator/types";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CoreTranslator } from "@/translators/core-translator/core-translator";
import * as hasKeyModule from "@/translators/methods/has-key";
import * as translateModule from "@/translators/methods/translate";

// Mock methods used by CoreTranslator
vi.mock("@/translators/methods/has-key");
vi.mock("@/translators/methods/translate");

describe("CoreTranslator", () => {
  const messages = { en: { hello: "Hello" }, zh: { hello: "你好" } };
  const locale = "en";
  const options: CoreTranslatorOptions<typeof messages> = {
    messages,
    locale,
  };

  let translator: CoreTranslator<typeof messages>;

  beforeEach(() => {
    vi.resetAllMocks();
    translator = new CoreTranslator(options);
  });

  it("should initialize with given messages and locale", () => {
    expect(translator["_messages"]).toEqual(messages);
    expect(translator["_locale"]).toBe(locale);
    expect(translator["_isLoading"]).toBe(false);
  });

  it("hasKey should call hasKey with correct arguments", () => {
    const key = "hello";
    const targetLocale = "zh";
    const spy = vi.mocked(hasKeyModule.hasKey).mockReturnValue(true);
    const result = translator.hasKey(key, targetLocale);
    expect(result).toBe(true);
    expect(spy).toHaveBeenCalledWith({
      messages: translator["_messages"],
      locale: translator["_locale"],
      key,
      targetLocale,
    });
  });

  it("t should call translate with correct arguments and return result", () => {
    const key = "hello";
    const replacements = { name: "Yiming" };
    const spy = vi
      .mocked(translateModule.translate)
      .mockReturnValue("Hello Yiming");
    const result = translator.t(key, replacements);
    expect(result).toBe("Hello Yiming");
    expect(spy).toHaveBeenCalledWith({
      hooks: translator["hooks"],
      messages: translator["_messages"],
      locale: translator["_locale"],
      isLoading: translator["_isLoading"],
      translateConfig: translator["translateConfig"],
      key,
      replacements,
    });
  });

  it("use should register a direct hook", () => {
    const hook: TranslateHook = {
      name: "test-hook",
      run: vi.fn(),
      order: 10,
    };
    const prevLength = translator["hooks"].length;
    translator.use(hook);
    expect(translator["hooks"].length).toBe(prevLength + 1);
    expect(translator["hooks"]).toContain(hook);
  });

  it("use should register a plugin with a single hook", () => {
    const hook: TranslateHook = {
      name: "plugin-hook",
      run: vi.fn(),
      order: 5,
    };
    const plugin: TranslatorPlugin = { hook };
    const prevLength = translator["hooks"].length;
    translator.use(plugin);
    expect(translator["hooks"].length).toBe(prevLength + 1);
    expect(translator["hooks"]).toContain(hook);
  });

  it("use should register a plugin with multiple hooks", () => {
    const hookA: TranslateHook = {
      name: "hookA",
      run: vi.fn(),
      order: 1,
    };
    const hookB: TranslateHook = {
      name: "hookB",
      run: vi.fn(),
      order: 2,
    };
    const plugin: TranslatorPlugin = {
      hook: [hookA, hookB],
    };
    const prevLength = translator["hooks"].length;
    translator.use(plugin);
    expect(translator["hooks"].length).toBe(prevLength + 2);
    expect(translator["hooks"]).toContain(hookA);
    expect(translator["hooks"]).toContain(hookB);
  });

  it("use should ignore a plugin without run or hook", () => {
    const prevLength = translator["hooks"].length;
    translator.use({} as TranslatorPlugin);
    expect(translator["hooks"].length).toBe(prevLength);
  });

  it("use should handle hooks without order when sorting", () => {
    const hookWithOrder: TranslateHook = {
      name: "ordered-hook",
      run: vi.fn(),
      order: 5,
    };
    const hookWithoutOrder: TranslateHook = {
      name: "no-order-hook",
      run: vi.fn(),
    };
    translator.use(hookWithOrder);
    translator.use(hookWithoutOrder);
    expect(translator["hooks"]).toContain(hookWithOrder);
    expect(translator["hooks"]).toContain(hookWithoutOrder);
  });

  it("should correctly sort hooks with and without order", () => {
    const hookA = { name: "A", run: vi.fn(), order: 5 };
    const hookB = { name: "B", run: vi.fn() };
    const hookC = { name: "C", run: vi.fn(), order: 1 };
    const hookD = { name: "D", run: vi.fn() };
    translator.use(hookA);
    translator.use(hookB);
    translator.use(hookC);
    translator.use(hookD);
    const hooks = translator["hooks"];
    expect(hooks.indexOf(hookB)).toBeLessThan(hooks.indexOf(hookC));
    expect(hooks.indexOf(hookD)).toBeLessThan(hooks.indexOf(hookC));
    expect(hooks.indexOf(hookC)).toBeLessThan(hooks.indexOf(hookA));
    expect([hookB, hookD]).toContain(hooks[0]);
    expect([hookB, hookD]).toContain(hooks[1]);
  });

  it("should load plugins passed via constructor (single hook)", () => {
    const hook: TranslateHook = {
      name: "ctor-hook",
      run: vi.fn(),
      order: 3,
    };
    const translatorWithPlugin = new CoreTranslator({
      messages,
      locale,
      plugins: [hook],
    });
    expect(translatorWithPlugin["hooks"]).toContain(hook);
  });

  it("should load plugin objects containing multiple hooks via constructor", () => {
    const hookA: TranslateHook = { name: "A", run: vi.fn(), order: 1 };
    const hookB: TranslateHook = { name: "B", run: vi.fn(), order: 2 };
    const plugin: TranslatorPlugin = { hook: [hookA, hookB] };
    const translatorWithPlugin = new CoreTranslator({
      messages,
      locale,
      plugins: [plugin],
    });
    expect(translatorWithPlugin["hooks"]).toContain(hookA);
    expect(translatorWithPlugin["hooks"]).toContain(hookB);
  });

  it("should apply constructor plugins the same way as manual use()", () => {
    const hook: TranslateHook = {
      name: "compare",
      run: vi.fn(),
      order: 10,
    };
    const translatorCtor = new CoreTranslator({
      messages,
      locale,
      plugins: [hook],
    });
    const translatorManual = new CoreTranslator({
      messages,
      locale,
    });
    translatorManual.use(hook);
    expect(translatorCtor["hooks"]).toEqual(translatorManual["hooks"]);
  });

  it("debugHooks should output debug information", () => {
    const hook: TranslateHook = {
      name: "hookA",
      run: vi.fn(),
    };
    translator.use(hook);
    expect(() => translator.debugHooks()).not.toThrow();
  });
});
