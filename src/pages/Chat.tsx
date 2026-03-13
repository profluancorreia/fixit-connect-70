import { useState } from "react";
import Header from "@/components/Header";
import { useApp } from "@/context/AppContext";
import { mockConversations, mockMessages } from "@/data/mockData";
import { ChatConversation, ChatMessage } from "@/types";
import { Button } from "@/components/ui/button";
import { Send, Paperclip, ArrowLeft, Wrench } from "lucide-react";

export default function Chat() {
  const { isLoggedIn } = useApp();
  const [activeConvo, setActiveConvo] = useState<ChatConversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [input, setInput] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const msg: ChatMessage = {
      id: `m-${Date.now()}`,
      text: input,
      sender: "me",
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, msg]);
    setInput("");
  };

  const selectConvo = (c: ChatConversation) => {
    setActiveConvo(c);
    setShowSidebar(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[70vh]">
          <p className="text-muted-foreground">Faça login para acessar suas mensagens.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1 max-w-6xl mx-auto w-full border-x border-border" style={{ height: "calc(100vh - 64px)" }}>
        {/* Sidebar */}
        <div className={`w-full md:w-80 border-r border-border flex flex-col bg-card shrink-0 ${!showSidebar && activeConvo ? "hidden md:flex" : "flex"}`}>
          <div className="p-4 border-b border-border">
            <input
              className="w-full border border-border rounded-xl px-4 py-2.5 bg-background text-foreground text-sm"
              placeholder="🔍 Buscar conversas"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockConversations.map((c) => (
              <button
                key={c.id}
                onClick={() => selectConvo(c)}
                className={`w-full flex items-center gap-3 p-3 hover:bg-secondary cursor-pointer rounded-xl mx-1 my-0.5 text-left transition-colors ${activeConvo?.id === c.id ? "bg-secondary" : ""}`}
              >
                <img src={c.contact.avatar} alt="" className="w-12 h-12 rounded-full border border-border shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">{c.contact.name}</span>
                    {c.unread && <span className="w-3 h-3 rounded-full bg-primary shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{c.serviceTitle}</p>
                  <p className="text-sm text-muted-foreground truncate">{c.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className={`flex-1 flex flex-col ${showSidebar && !activeConvo ? "hidden md:flex" : "flex"}`}>
          {activeConvo ? (
            <>
              <div className="p-4 border-b border-border flex items-center gap-3">
                <button onClick={() => setShowSidebar(true)} className="md:hidden p-1">
                  <ArrowLeft className="w-5 h-5 text-foreground" />
                </button>
                <img src={activeConvo.contact.avatar} alt="" className="w-10 h-10 rounded-full border border-border" />
                <div>
                  <span className="text-sm font-semibold text-foreground">{activeConvo.contact.name}</span>
                  <p className="text-xs text-muted-foreground">Ver anúncio original →</p>
                </div>
              </div>

              {activeConvo.status === "in_progress" && activeConvo.agreedValue && (
                <div className="mx-4 mt-3 bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Wrench className="w-4 h-4 text-primary" />
                    Serviço em andamento · Valor: R$ {activeConvo.agreedValue.toFixed(2).replace(".", ",")}
                  </div>
                  <Button size="sm">Finalizar e Pagar</Button>
                </div>
              )}

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 text-sm ${
                        msg.sender === "me"
                          ? "bg-foreground text-card rounded-2xl rounded-br-sm"
                          : "bg-secondary text-foreground rounded-2xl rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                      <span className={`text-[10px] block mt-1 ${msg.sender === "me" ? "text-card/60" : "text-muted-foreground"}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSend} className="p-4 border-t border-border flex items-center gap-2">
                <button type="button" className="p-2 text-muted-foreground hover:text-foreground">
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 border border-border rounded-2xl px-4 py-3 bg-card text-foreground text-sm"
                  placeholder="Digite uma mensagem..."
                />
                <Button type="submit" size="icon" disabled={!input.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
              Selecione uma conversa
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
