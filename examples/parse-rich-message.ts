import { Translator, parseRichMessage } from "intor-translator";

/**
 * Use `parseRichMessage` to parse rich-formatted translation output.
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

const message = translator.t("welcome");
console.dir(parseRichMessage(message), { depth: null });
// => [
//      { type: 'text', value: 'welcome to ' },
//      {
//        type: 'tag',
//        name: 'a',
//        attributes: { id: 'home', href: '/home' },
//        children: [ { type: 'text', value: 'our site' } ]
//      },
//      { type: 'text', value: '!' }
//    ]
