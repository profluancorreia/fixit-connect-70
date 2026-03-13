import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import ModalOverlay from "@/components/ModalOverlay";
import { Upload, LogOut } from "lucide-react";

export default function EditProfileModal() {
  const { openModal, setOpenModal, currentUser, logout } = useApp();
  const [isPro, setIsPro] = useState(currentUser?.isProfessional || false);

  const specialties = ["Hidráulica", "Elétrica", "Pintura", "Marcenaria", "Alvenaria", "Refrigeração", "Limpeza"];
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);

  const toggleSpec = (s: string) => {
    setSelectedSpecs((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  return (
    <ModalOverlay isOpen={openModal === "editProfile"} onClose={() => setOpenModal(null)} maxWidth="max-w-lg">
      <div className="p-6">
        <h2 className="font-display text-xl font-bold text-foreground mb-5">Editar Perfil</h2>

        <div className="flex justify-center mb-5">
          <div className="relative">
            <img src={currentUser?.avatar} alt="" className="w-20 h-20 rounded-full object-cover border border-border" />
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
          </div>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setOpenModal(null); }}>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Nome</label>
            <input defaultValue={currentUser?.name} className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Bio</label>
            <textarea className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm h-20 resize-none" placeholder="Conte um pouco sobre você..." />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Telefone (WhatsApp)</label>
            <input defaultValue={currentUser?.phone} className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm" placeholder="(11) 99999-0000" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">CEP</label>
              <input defaultValue={currentUser?.address?.cep} className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Bairro</label>
              <input defaultValue={currentUser?.address?.bairro} className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Cidade</label>
              <input defaultValue={currentUser?.address?.cidade} className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm" />
            </div>
          </div>

          <label className="flex items-center gap-3 p-3 rounded-xl bg-secondary cursor-pointer">
            <input type="checkbox" checked={isPro} onChange={(e) => setIsPro(e.target.checked)} className="rounded" />
            <span className="text-sm font-medium text-foreground">Mostrar meu perfil como Profissional</span>
          </label>

          {isPro && (
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Especialidades</label>
              <div className="flex flex-wrap gap-2">
                {specialties.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSpec(s)}
                    className={`text-xs px-3 py-1.5 rounded-full transition-colors ${selectedSpecs.includes(s) ? "bg-foreground text-card" : "bg-secondary text-foreground hover:bg-muted"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" size="lg">Salvar Alterações</Button>
        </form>

        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-destructive hover:underline mt-4 mx-auto"
        >
          <LogOut className="w-4 h-4" /> Sair da conta
        </button>
      </div>
    </ModalOverlay>
  );
}
