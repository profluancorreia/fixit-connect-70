import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import ModalOverlay from "@/components/ModalOverlay";
import { Wrench, Lock, Upload } from "lucide-react";

export default function CadastroModal() {
  const { openModal, setOpenModal, login } = useApp();
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <ModalOverlay isOpen={openModal === "cadastro"} onClose={() => setOpenModal(null)}>
      <div className="p-8">
        <div className="flex items-center gap-2 justify-center mb-4">
          <Wrench className="w-6 h-6 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">SeverinoApp</span>
        </div>
        <div className="flex items-center gap-2 justify-center mb-6 text-sm text-muted-foreground">
          <Lock className="w-4 h-4" /> Plataforma Segura
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
              <Upload className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Nome completo</label>
            <input className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm" placeholder="Seu nome" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">E-mail</label>
            <input type="email" className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm" placeholder="seu@email.com" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Senha</label>
              <input type="password" className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm" placeholder="••••••••" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Confirmar</label>
              <input type="password" className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm" placeholder="••••••••" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <label className="text-sm font-medium text-foreground mb-1 block">CEP</label>
              <input className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm" placeholder="00000-000" />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium text-foreground mb-1 block">Rua</label>
              <input className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm" placeholder="Nome da rua" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Número</label>
              <input className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm" placeholder="Nº" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Bairro</label>
              <input className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm" placeholder="Bairro" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Cidade</label>
              <input className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm" placeholder="Cidade" />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="rounded" />
            Li e aceito os Termos de Uso
          </label>

          <Button type="submit" className="w-full" size="lg">Criar Conta</Button>
        </form>

        <p className="text-sm text-center text-muted-foreground mt-4">
          Já tem conta?{" "}
          <button onClick={() => setOpenModal("login")} className="text-primary font-medium hover:underline">
            Entrar
          </button>
        </p>
      </div>
    </ModalOverlay>
  );
}
