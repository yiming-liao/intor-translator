import type { ASTNode } from "@/message/ast";
import { buildAST } from "@/message/ast";
import { tokenize } from "@/message/tokenize";

/**
 * Parse a rich-formatted message string into a semantic AST.
 *
 * This function is a high-level entry point for processing translated
 * messages that contain semantic tags (e.g. <b>, <a>, <i>).
 *
 * Internally, it performs the following steps:
 *
 * - message (string) ⬇
 *   - tokenize
 *   - build AST
 *
 * The returned AST represents the semantic structure of the message
 * and is intended to be consumed by renderers or further processing stages.
 */
export function parseRichMessage(message: string): ASTNode[] {
  const tokens = tokenize(message);
  return buildAST(tokens);
}
