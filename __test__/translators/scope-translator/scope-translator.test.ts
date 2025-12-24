import type { CoreTranslatorOptions } from "@/translators/core-translator";
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as hasKeyModule from "@/translators/methods/has-key";
import * as translateModule from "@/translators/methods/translate";
import { ScopeTranslator } from "@/translators/scope-translator/scope-translator";
import * as getFullKeyModule from "@/translators/scope-translator/utils/get-full-key";

vi.mock("@/translators/methods/has-key");
vi.mock("@/translators/methods/translate");
vi.mock("@/translators/scope-translator/utils/get-full-key");

describe("ScopeTranslator", () => {
  const messages = { en: { hello: "Hello", nested: { greet: "Hi" } } };
  const locale = "en";

  const options: CoreTranslatorOptions<typeof messages> = { messages, locale };
  let translator: ScopeTranslator<typeof messages>;

  beforeEach(() => {
    vi.resetAllMocks();
    translator = new ScopeTranslator(options);
  });

  it("scoped returns an object with hasKey and t methods", () => {
    const scoped = translator.scoped("nested");
    expect(typeof scoped.hasKey).toBe("function");
    expect(typeof scoped.t).toBe("function");
  });

  it("scoped.hasKey calls hasKeyMethod with correct full key", () => {
    const scoped = translator.scoped("nested");
    vi.mocked(getFullKeyModule.getFullKey).mockReturnValue("nested.greet");
    vi.mocked(hasKeyModule.hasKey).mockReturnValue(true);

    const result = scoped.hasKey("greet", "en");
    expect(result).toBe(true);
    expect(getFullKeyModule.getFullKey).toHaveBeenCalledWith("nested", "greet");
    expect(hasKeyModule.hasKey).toHaveBeenCalledWith({
      messages: translator["messages"],
      locale: translator["locale"],
      key: "nested.greet",
      targetLocale: "en",
    });
  });

  it("scoped.t calls translate with correct full key and replacements", () => {
    const scoped = translator.scoped("nested");
    vi.mocked(getFullKeyModule.getFullKey).mockReturnValue("nested.greet");
    vi.mocked(translateModule.translate).mockReturnValue("Hi!");

    const result = scoped.t("greet", { name: "Yiming" });
    expect(result).toBe("Hi!");
    expect(getFullKeyModule.getFullKey).toHaveBeenCalledWith("nested", "greet");
    expect(translateModule.translate).toHaveBeenCalledWith({
      hooks: translator["hooks"],
      messages: translator["messages"],
      locale: translator["locale"],
      isLoading: translator["isLoading"],
      translateConfig: translator["translateConfig"],
      key: "nested.greet",
      replacements: { name: "Yiming" },
    });
  });

  it("scoped works without preKey", () => {
    const scoped = translator.scoped();
    vi.mocked(getFullKeyModule.getFullKey).mockReturnValue("hello");
    vi.mocked(hasKeyModule.hasKey).mockReturnValue(true);
    vi.mocked(translateModule.translate).mockReturnValue("Hello!");

    const keyResult = scoped.hasKey("hello");
    const tResult = scoped.t("hello");
    expect(keyResult).toBe(true);
    expect(tResult).toBe("Hello!");
  });
});
