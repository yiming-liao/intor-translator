import type { Renderer } from "@/message/render/types";
import { renderRichMessage } from "@/message";

it("renders a rich message end-to-end", () => {
  const renderer: Renderer<string> = {
    text: (value) => value,
    tag: (_name, _attrs, children) => children.join(""),
  };
  const output = renderRichMessage("Hello <b>world</b>", renderer);
  expect(output.join("")).toBe("Hello world");
});
