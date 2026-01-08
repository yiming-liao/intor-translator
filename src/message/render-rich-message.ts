import type { Renderer } from "@/message/render";
import type { MessageValue } from "@/types";
import { parseRichMessage } from "@/message/parse-rich-message";
import { render } from "@/message/render/render";

/**
 * Render a rich message value into a concrete output using the given renderer.
 *
 * This function is the main entry point of the rich message pipeline.
 * It orchestrates the full flow from message value to rendered output:
 *
 * - MessageValue ⬇
 *   - parse into semantic AST
 *   - render AST via the provided renderer
 *
 * All rendering behavior is delegated to the renderer, making this function
 * fully environment-agnostic (e.g. string, DOM, React).
 */
export function renderRichMessage<Output>(
  message: MessageValue,
  renderer: Renderer<Output>,
): Output[] {
  const nodes = parseRichMessage(message);
  return render(nodes, renderer);
}
