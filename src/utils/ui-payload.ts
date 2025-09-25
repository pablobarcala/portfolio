export type UIPayload =
  | { type: "card"; title?: string; body?: string; accent?: string }
  | { type: "buttons"; title?: string; items: { label: string; value: string }[] }
  | { type: "skills"; title?: string; items: { label: string; value?: string, bullets?: string[] }[] }
  | { type: "links"; title?: string; items: { label: string; href: string }[] }
  | { type: "timeline"; title?: string; items: { title: string; subtitle?: string; period?: string; bullets?: string[] }[] };

export async function callAiOnce(message: string): Promise<{ text: string; ui: UIPayload | null }> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error("Chat failed");
  const data = await res.json();
  return { text: data.text ?? "", ui: data.ui ?? null };
}