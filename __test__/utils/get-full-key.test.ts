import { getFullKey } from "@/utils/get-full-key";

describe("getFullKey", () => {
  it("should return key if preKey is undefined", () => {
    expect(getFullKey(undefined, "home.title")).toBe("home.title");
  });

  it("should return preKey if key is undefined", () => {
    expect(getFullKey("home", undefined)).toBe("home");
  });

  it("should concatenate preKey and key with dot", () => {
    expect(getFullKey("home", "title")).toBe("home.title");
  });
});
