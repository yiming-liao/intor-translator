import type { Attributes } from "@/message/types";

/**
 * Renderer interface for semantic message ASTs.
 *
 * A renderer defines how semantic nodes are transformed into a concrete output
 * representation (e.g. string, DOM nodes, React elements).
 *
 * This interface is stateless by design.
 * All rendering behavior is expressed through implementation.
 */
export interface Renderer<Output> {
  /** Render a plain text node. */
  text(value: string): Output;

  /** Render a semantic tag node with attributes and rendered children. */
  tag(name: string, attributes: Attributes, children: Output[]): Output;
}
