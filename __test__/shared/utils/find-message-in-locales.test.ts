import { findMessageInLocales } from "@/shared/utils/find-message-in-locales";

const messages = {
  en: {
    auth: {
      login: {
        title: "Login",
      },
    },
  },
  fr: {
    auth: {
      login: {
        title: "Connexion",
      },
    },
  },
};

describe("findMessageInLocales", () => {
  it("should find message in the first locale", () => {
    const result = findMessageInLocales({
      messages,
      candidateLocales: ["en", "fr"],
      key: "auth.login.title",
    });
    expect(result).toBe("Login");
  });

  it("should find message in the fallback locale", () => {
    const result = findMessageInLocales({
      messages,
      candidateLocales: ["de" as "en", "fr"],
      key: "auth.login.title",
    });
    expect(result).toBe("Connexion");
  });

  it("should return undefined if message does not exist in any locale", () => {
    const result = findMessageInLocales({
      messages,
      candidateLocales: ["en", "fr"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      key: "auth.logout.title" as any,
    });
    expect(result).toBeUndefined();
  });
});
