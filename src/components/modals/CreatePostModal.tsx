import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import ModalOverlay from "@/components/ModalOverlay";
import { Upload, Camera } from "lucide-react";
import { categories } from "@/data/mockData";

export default function CreatePostModal() {
  const { openModal, setOpenModal } = useApp();
  const [postType, setPostType] = useState<"pedido" | "profissional">("pedido");
  const [boost, setBoost] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenModal(null);
  };

  return (
    <ModalOverlay isOpen={openModal === "createPost"} onClose={() => setOpenModal(null)} maxWidth="max-w-lg">
      <div className="p-6">
        <h2 className="font-display text-xl font-bold text-foreground mb-5">Criar Publicação</h2>

        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setPostType("pedido")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${postType === "pedido" ? "bg-foreground text-card" : "bg-secondary text-foreground"}`}
          >
            Pedir Ajuda
          </button>
          <button
            onClick={() => setPostType("profissional")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${postType === "profissional" ? "bg-foreground text-card" : "bg-secondary text-foreground"}`}
          >
            Oferecer Serviço
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary hover:bg-orange-50 transition-colors cursor-pointer">
            <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Arraste uma foto aqui</p>
            <p className="text-xs text-muted-foreground">ou clique para selecionar</p>
            <p className="text-xs text-muted-foreground mt-1">Formatos: JPG, PNG · Máx: 5MB</p>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Título</label>
            <input className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm" placeholder="Descreva em poucas palavras" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Descrição</label>
            <textarea className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm h-24 resize-none" placeholder="Explique o problema em detalhes..." />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Categoria</label>
            <select className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm">
              <option value="">Selecione...</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <label className="text-sm font-medium text-foreground mb-1 block">CEP</label>
              <input className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm" placeholder="00000-000" />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium text-foreground mb-1 block">Bairro</label>
              <input className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm" placeholder="Bairro" />
            </div>
          </div>

          <label className="flex items-center gap-3 p-3 rounded-xl bg-secondary cursor-pointer">
            <input type="checkbox" checked={boost} onChange={(e) => setBoost(e.target.checked)} className="rounded" />
            <div>
              <span className="text-sm font-medium text-foreground">Impulsionar anúncio</span>
              <p className="text-xs text-muted-foreground">
                {postType === "pedido" ? "Badge URGENTE" : "Badge PATROCINADO"}
              </p>
            </div>
          </label>

          <Button type="submit" className="w-full" size="lg">Publicar Agora</Button>
        </form>
      </div>
    </ModalOverlay>
  );
}
