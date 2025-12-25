import type { Renderer } from "./types";
import type { ASTNode } from "@/message/ast";

/**
 * Render a semantic AST using a provided renderer.
 *
 * - Traverses the AST structure recursively
 * - Delegates actual rendering to the given renderer
 * - Environment-agnostic
 *
 * This function performs no parsing or transformation;
 * it simply maps structure to output.
 */
export function render<Output>(
  nodes: ASTNode[],
  renderer: Renderer<Output>,
): Output[] {
  return nodes.map((node) => {
    // Plain text node
    if (node.type === "text") {
      return renderer.text(node.value);
    }

    // Semantic tag node
    const children = render(node.children, renderer);
    return renderer.tag(node.name, node.attributes, children);
  });
}
