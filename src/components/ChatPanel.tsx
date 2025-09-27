// chat/ChatPanel.tsx
import { extractUiPayload } from "@/utils/parse-ai-ui"
import { Send } from "lucide-react"
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import { UiBlock } from "./UiBlocks"
import { useCvModal } from "./CvModalProvider"

export type ChatMessage = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
}

type Props = {
  messages: ChatMessage[]
  onSend: (text: string) => void
  header?: string,
  thinking?: boolean
}

const ChatPanel = forwardRef(function ChatPanel(
  { messages, onSend, header = "Chat", thinking }: Props,
  ref
) {
  const listRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { openCvModal } = useCvModal()

  useImperativeHandle(ref, () => ({
    focusInput: () => inputRef.current?.focus()
  }))

  // auto-scroll al último mensaje
  useEffect(() => {
    const el = listRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = (e.target as HTMLInputElement).value
      onSend(value)
      ;(e.target as HTMLInputElement).value = ""
    }
  }

  const handleUiButton = (value: string) => {
    if (value === "__OPEN_CV_MODAL__") {
      openCvModal()
      return
    }
    onSend(value)
  }

  return (
    <div className="w-full max-w-4xl mx-auto z-20">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 rounded-xl
                      ">
        <p className="text-sm font-bold text-white/90">{header}</p>
        <span className="text-xs text-white/50">AI Chat</span>
      </div>

      {/* Mensajes (scroll interno) */}
      <div
        ref={listRef}
        className="mt-3 h-[48vh] md:h-[55vh] overflow-y-auto rounded-xl p-3
             bg-neutral-900/50 border border-white/10 backdrop-blur space-y-2"
        id="chat-messages-container"
      >
        {messages.map(m => {
          const isUser = m.role === "user"

          if (isUser) {
            return (
              <div key={m.id}
                className="max-w-[85%] px-3 py-3 rounded-2xl shadow ml-auto bg-emerald-500/20 border border-emerald-300/20">
                <p className="text-sm text-white/90 leading-relaxed whitespace-pre-wrap">{m.content}</p>
              </div>
            );
          }

          const structured = parseAssistantContent(m.content);

          
          return (
            <div key={m.id}
              className="max-w-[85%] px-3 py-3 rounded-2xl shadow mr-auto bg-neutral-800/70 border border-white/10">
              {/* UI */}
              {structured?.ui && (
                <div className="mb-2">
                  <UiBlock ui={structured.ui} onButtonClick={handleUiButton} />
                </div>
              )}
              {/* Texto */}
              {structured?.text
                ? 
                  (
                    <p className="text-sm text-white/90 leading-relaxed whitespace-pre-wrap">
                      {structured.text}
                    </p> 
                  )
                : <p className="text-sm text-white/90 leading-relaxed whitespace-pre-wrap">{m.content}</p>
              }
            </div>
          );
        })}
        {thinking && (
          <div className="mr-auto max-w-[70%] px-3 py-2 rounded-2xl bg-neutral-800/70 border border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-white/70 text-sm">{detectLangLastMessage(messages) === "es" ? "Pensando" : "Thinking"}</span>
              <span className="relative inline-flex">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:-0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/60 mx-1 animate-bounce [animation-delay:-0.1s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="mt-3 flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type your message…"
          onKeyDown={handleKeyDown}
          className="flex-1 px-3 py-2 rounded-xl bg-neutral-800/70 text-white
                     placeholder-white/40 border border-white/10 outline-none
                     focus:border-emerald-500/50 backdrop-blur-lg"
        />
        <button
          onClick={() => {
            const v = inputRef.current?.value ?? ""
            if (!v.trim()) return
            onSend(v)
            if (inputRef.current) inputRef.current.value = ""
          }}
          className="backdrop-blur-xl px-3 py-2 rounded-xl border border-white/10 bg-white/20 
                     text-emerald-500 transition cursor-pointer hover:bg-emerald-500/20 hover:text-white"
        >
          <Send />
        </button>
      </div>
    </div>
  )
})

export default ChatPanel

function parseAssistantContent(raw: string): { text: string; ui: any | null } | null {
  try {
    const obj = JSON.parse(raw);
    if (typeof obj?.text === "string") {
      return { text: obj.text, ui: obj.ui ?? null };
    }
    return null;
  } catch {
    return null;
  }
}

function detectLangLastMessage(msgs: ChatMessage[]): "es"|"en" {
  const lastUser = [...msgs].reverse().find(m => m.role === "user")?.content || "";
  return /[ñáéíóú¿¡]/i.test(lastUser) ? "es" : "en";
}
