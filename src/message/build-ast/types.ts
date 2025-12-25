import type { Attributes } from "@/message/tokenize/types";

/** Semantic node produced by the AST builder. */
export type ASTNode = TextNode | TagNode;

/** Plain text node in the semantic AST. */
export interface TextNode {
  type: "text";
  value: string;
}

/** Semantic tag node with attributes and nested children. */
export interface TagNode {
  type: "tag";
  name: string;
  attributes: Attributes;
  children: ASTNode[];
}
