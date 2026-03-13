import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import ModalOverlay from "@/components/ModalOverlay";
import { Wrench, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginModal() {
  const { openModal, setOpenModal, login } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <ModalOverlay isOpen={openModal === "login"} onClose={() => setOpenModal(null)}>
      <div className="p-8">
        <div className="flex items-center gap-2 justify-center mb-6">
          <Wrench className="w-6 h-6 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">SeverinoApp</span>
        </div>
        <div className="flex items-center gap-2 justify-center mb-6 text-sm text-muted-foreground">
          <Lock className="w-4 h-4" /> Plataforma Segura
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground placeholder:text-muted-foreground text-sm"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">Entrar</Button>
        </form>

        <button
          onClick={() => setOpenModal("recuperarSenha")}
          className="text-sm text-muted-foreground hover:text-foreground mt-3 block mx-auto"
        >
          Esqueci minha senha
        </button>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">ou</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <Button variant="outline" className="w-full" onClick={login}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="" />
          Entrar com Google
        </Button>

        <p className="text-sm text-center text-muted-foreground mt-5">
          Não tem conta?{" "}
          <button onClick={() => setOpenModal("cadastro")} className="text-primary font-medium hover:underline">
            Cadastre-se
          </button>
        </p>
      </div>
    </ModalOverlay>
  );
}
