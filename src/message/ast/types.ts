import type { Attributes } from "@/message/types";
import type { MessageValue } from "@/types";

/** Semantic node produced by the AST builder. */
export type ASTNode = TextNode | TagNode | RawNode;

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

/** Raw node representing a non-tokenizable message value. */
export interface RawNode {
  type: "raw";
  value: Exclude<MessageValue, string>;
}
