// parse-ai-ui.ts
import type { UIPayload } from "./ui-payload";

const UI_BLOCK_RE = /```json\s+ai:ui\s*([\s\S]*?)```/i;

export function extractUiPayload(text: string): { ui?: UIPayload; plain: string } {
  const m = text.match(UI_BLOCK_RE);
  if (!m) return { plain: text };
  try {
    const json = JSON.parse(m[1].trim()) as UIPayload;
    const plain = text.replace(UI_BLOCK_RE, "").trim();
    return { ui: json, plain };
  } catch {
    // si parsea mal, mostramos como texto
    return { plain: text };
  }
}
