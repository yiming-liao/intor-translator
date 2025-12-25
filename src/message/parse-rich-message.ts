import type { ASTNode } from "@/message/build-ast/types";
import { buildAST } from "@/message/build-ast";
import { tokenize } from "@/message/tokenize";

/**
 * Parse a rich-formatted message string into a semantic AST.
 *
 * This is the high-level entry point for processing translated messages
 * that contain semantic tags (e.g. <b>, <a>, <i>).
 *
 * Internally, this function:
 * - Tokenizes the input string into semantic tokens
 * - Builds a nested AST from the token stream
 *
 * Consumers should treat the returned AST as a semantic structure
 * suitable for rendering or further processing.
 */
export function parseRichMessage(message: string): ASTNode[] {
  const tokens = tokenize(message);
  return buildAST(tokens);
}
