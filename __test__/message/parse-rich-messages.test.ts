import { parseRichMessage } from "@/message";

it("parses a rich message end-to-end", () => {
  const ast = parseRichMessage("Hello <b>world</b>");
  expect(ast).toBeTruthy();
});
