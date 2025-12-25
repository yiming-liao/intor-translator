import { Translator, parseRichMessage } from "intor-translator";

/**
 * Use `parseRichMessage` to parse rich-formatted translation output.
 *
 * run:
 * tsx examples/parse-rich-message.ts
 */

// Messages (follows the LocalesMessages structure)
const messages = {
  en: {
    hello: `Hello <b>world</b>`,
    welcome: `welcome to <a id="home" href="/home">our site</a>!`,
  },
};

// Create a translator instance
const translator = new Translator({ messages, locale: "en" });

//════════════════════════ Output ════════════════════════

// Parse the translated string into a semantic AST
console.dir(parseRichMessage(translator.t("hello")), { depth: null });
// [
//   { type: 'text', value: 'Hello ' },
//   {
//     type: 'tag',
//     name: 'b',
//     attributes: {},
//     children: [ { type: 'text', value: 'world' } ]
//   }
// ]

console.dir(parseRichMessage(translator.t("welcome")), { depth: null });
// [
//   { type: 'text', value: 'welcome to ' },
//   {
//     type: 'tag',
//     name: 'a',
//     attributes: { id: 'home', href: '/home' },
//     children: [ { type: 'text', value: 'our site' } ]
//   },
//   { type: 'text', value: '!' }
// ]
