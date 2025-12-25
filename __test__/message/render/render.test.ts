import type { ASTNode } from "@/message/ast/types";
import type { Renderer } from "@/message/render/types";
import { describe, it, expect } from "vitest";
import { render } from "@/message/render/render";

describe("render", () => {
  it("renders plain text nodes", () => {
    const ast: ASTNode[] = [{ type: "text", value: "Hello" }];
    const renderer: Renderer<string> = {
      text: (value) => value,
      tag: () => "",
    };
    const result = render(ast, renderer);
    expect(result).toEqual(["Hello"]);
  });

  it("renders a single tag with children", () => {
    const ast: ASTNode[] = [
      {
        type: "tag",
        name: "b",
        attributes: {},
        children: [{ type: "text", value: "world" }],
      },
    ];
    const renderer: Renderer<string> = {
      text: (value) => value,
      tag: (name, _attrs, children) =>
        `<${name}>${children.join("")}</${name}>`,
    };
    const result = render(ast, renderer);
    expect(result).toEqual(["<b>world</b>"]);
  });

  it("renders nested tags correctly", () => {
    const ast: ASTNode[] = [
      {
        type: "tag",
        name: "b",
        attributes: {},
        children: [
          {
            type: "tag",
            name: "i",
            attributes: {},
            children: [{ type: "text", value: "text" }],
          },
        ],
      },
    ];
    const renderer: Renderer<string> = {
      text: (value) => value,
      tag: (name, _attrs, children) =>
        `<${name}>${children.join("")}</${name}>`,
    };
    const result = render(ast, renderer);
    expect(result).toEqual(["<b><i>text</i></b>"]);
  });
});
