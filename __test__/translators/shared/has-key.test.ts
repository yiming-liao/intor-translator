import { describe, it, expect, vi, beforeEach } from "vitest";
import { hasKey } from "@/translators/shared/has-key";
import { findMessageInLocales } from "@/translators/shared/utils/find-message-in-locales";
import { resolveCandidateLocales } from "@/translators/shared/utils/resolve-candidate-locales";

// mock utils
vi.mock("@/translators/shared/utils/find-message-in-locales");
vi.mock("@/translators/shared/utils/resolve-candidate-locales");

describe("hasKey", () => {
  const messages = {
    en: { hello: "world" },
    zh: { hello: "世界" },
  };
  const locale = "en";

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return true if key exists in messages", () => {
    vi.mocked(resolveCandidateLocales).mockReturnValue(["en"]);
    vi.mocked(findMessageInLocales).mockReturnValue("world");

    const result = hasKey({
      messages,
      locale,
      key: "hello",
    });
    expect(result).toBe(true);
  });

  it("should return false if key does not exist", () => {
    vi.mocked(resolveCandidateLocales).mockReturnValue(["en"]);
    vi.mocked(findMessageInLocales).mockReturnValue(undefined);

    const result = hasKey({
      messages,
      locale,
      key: "missing",
    });
    expect(result).toBe(false);
  });

  it("should use targetLocale if provided", () => {
    vi.mocked(resolveCandidateLocales).mockReturnValue(["zh"]);
    vi.mocked(findMessageInLocales).mockReturnValue("世界");

    const result = hasKey({
      messages,
      locale,
      key: "hello",
      targetLocale: "zh",
    });
    expect(result).toBe(true);
  });
});
