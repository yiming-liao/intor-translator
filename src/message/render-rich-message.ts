import type { Renderer } from "@/message/render";
import { parseRichMessage } from "@/message/parse-rich-message";
import { render } from "@/message/render/render";

/**
 * Render a rich-formatted message into a concrete output using a renderer.
 *
 * This function orchestrates the full rich message pipeline:
 *
 * - message (string) ⬇
 *   - tokenize
 *   - build AST
 *   - render via provided renderer
 *
 * All rendering behavior is defined by the given renderer, making this
 * function environment-agnostic (string, DOM, React, etc.).
 */
export function renderRichMessage<Output>(
  message: string,
  renderer: Renderer<Output>,
): Output[] {
  const nodes = parseRichMessage(message);
  return render(nodes, renderer);
}
