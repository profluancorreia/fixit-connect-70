import { Wrench, Briefcase, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

export default function TriggerCard() {
  const { isLoggedIn, currentUser, setOpenModal } = useApp();

  const handleAction = (modal: "createPost" | "aiBuilder") => {
    if (!isLoggedIn) {
      setOpenModal("login");
      return;
    }
    setOpenModal(modal);
  };

  return (
    <div className="bg-card rounded-xl shadow-card p-5">
      <div className="flex items-center gap-3 mb-4">
        {isLoggedIn && currentUser ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full object-cover border border-border"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <Wrench className="w-5 h-5 text-muted-foreground" />
          </div>
        )}
        <div
          onClick={() => handleAction("createPost")}
          className="flex-1 px-4 py-3 bg-secondary rounded-xl text-muted-foreground text-sm cursor-pointer hover:bg-muted transition-colors"
        >
          Qual problema você precisa resolver hoje?
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="trigger" size="sm" onClick={() => handleAction("createPost")}>
          <Wrench className="w-4 h-4" /> Pedir Ajuda
        </Button>
        <Button variant="trigger" size="sm" onClick={() => handleAction("createPost")}>
          <Briefcase className="w-4 h-4" /> Oferecer Serviço
        </Button>
        <Button variant="ai" size="sm" onClick={() => handleAction("aiBuilder")}>
          <Sparkles className="w-4 h-4" /> Criar com IA
        </Button>
      </div>
    </div>
  );
}
