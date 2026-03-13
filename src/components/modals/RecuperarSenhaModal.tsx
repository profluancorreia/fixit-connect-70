import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import ModalOverlay from "@/components/ModalOverlay";
import { Wrench, Mail, CheckCircle } from "lucide-react";

export default function RecuperarSenhaModal() {
  const { openModal, setOpenModal } = useApp();
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <ModalOverlay isOpen={openModal === "recuperarSenha"} onClose={() => { setOpenModal(null); setSent(false); }}>
      <div className="p-8 text-center">
        <div className="flex items-center gap-2 justify-center mb-6">
          <Wrench className="w-6 h-6 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">SeverinoApp</span>
        </div>

        {sent ? (
          <div className="space-y-4">
            <CheckCircle className="w-16 h-16 text-success mx-auto" />
            <h2 className="font-display text-xl font-bold text-foreground">Verifique seu e-mail</h2>
            <p className="text-sm text-muted-foreground">Enviamos um link de recuperação para <strong>{email}</strong></p>
            <Button variant="outline" onClick={() => { setOpenModal(null); setSent(false); }}>Voltar ao Login</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Mail className="w-12 h-12 text-muted-foreground mx-auto" />
            <h2 className="font-display text-lg font-bold text-foreground">Recuperar Senha</h2>
            <div className="text-left">
              <label className="text-sm font-medium text-foreground mb-1 block">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm"
                placeholder="seu@email.com"
              />
            </div>
            <Button type="submit" className="w-full" size="lg">Enviar link de recuperação</Button>
            <button onClick={() => setOpenModal("login")} className="text-sm text-muted-foreground hover:text-foreground">
              Voltar ao Login
            </button>
          </form>
        )}
      </div>
    </ModalOverlay>
  );
}
