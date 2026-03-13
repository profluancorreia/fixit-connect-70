import { Wrench, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const { isLoggedIn, currentUser, setOpenModal, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          <Wrench className="w-6 h-6 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">SeverinoApp</span>
        </button>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/mensagens")}
                className="relative p-2 rounded-xl hover:bg-secondary transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-foreground" />
                <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-primary" />
              </button>
              <button
                onClick={() => setOpenModal("editProfile")}
                className="relative"
              >
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="w-10 h-10 rounded-full object-cover border border-border"
                />
              </button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => setOpenModal("login")}>
                Entrar
              </Button>
              <Button size="sm" onClick={() => setOpenModal("cadastro")}>
                Cadastrar
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
