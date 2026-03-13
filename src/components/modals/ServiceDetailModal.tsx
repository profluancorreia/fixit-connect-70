import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import ModalOverlay from "@/components/ModalOverlay";
import { mockProposals } from "@/data/mockData";
import { MapPin, Phone, CheckCircle, MessageSquare } from "lucide-react";

export default function ServiceDetailModal() {
  const { openModal, setOpenModal, selectedPost, isLoggedIn, setCheckoutData } = useApp();

  if (!selectedPost) return null;

  const isPedido = selectedPost.type === "pedido";

  const handleAcceptProposal = (value: number, name: string) => {
    setCheckoutData({ serviceTitle: selectedPost.title, professionalName: name, value });
    setOpenModal("checkout");
  };

  return (
    <ModalOverlay isOpen={openModal === "serviceDetail"} onClose={() => setOpenModal(null)} maxWidth="max-w-4xl">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full rounded-xl object-cover aspect-video border border-border"
            />
            <h2 className="font-display text-2xl font-bold text-foreground mt-4">{selectedPost.title}</h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{selectedPost.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-secondary text-muted-foreground rounded-full text-sm px-3 py-1">{selectedPost.category}</span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <img src={selectedPost.author.avatar} alt="" className="w-8 h-8 rounded-full border border-border" />
              <span className="text-sm font-medium text-foreground">{selectedPost.author.name}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto">
                <MapPin className="w-3 h-3" /> {selectedPost.location}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <Button variant="whatsapp" className="w-full" size="xl">
              <Phone className="w-5 h-5" /> Chamar no WhatsApp
            </Button>
          </div>
        </div>

        {isPedido && (
          <div className="mt-8 border-t border-border pt-6">
            <h3 className="font-display text-lg font-bold text-foreground mb-4">Propostas Recebidas</h3>

            {isLoggedIn && (
              <div className="bg-secondary rounded-xl p-4 mb-6">
                <textarea
                  className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm h-20 resize-none mb-3"
                  placeholder="Descreva como você vai resolver..."
                />
                <div className="flex gap-3 items-center">
                  <div className="relative flex-1 max-w-[160px]">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">R$</span>
                    <input
                      className="w-full border border-border rounded-xl pl-9 pr-4 py-3 bg-card text-foreground text-sm tabular-nums"
                      placeholder="0,00"
                    />
                  </div>
                  <Button size="lg">Enviar Proposta</Button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {mockProposals.map((proposal) => (
                <div key={proposal.id} className="bg-card border border-border rounded-xl shadow-sm p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={proposal.professional.avatar} alt="" className="w-10 h-10 rounded-full border border-border" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">{proposal.professional.name}</span>
                        {proposal.professional.isVerified && (
                          <span className="flex items-center gap-1 bg-indigo-50 text-indigo-600 text-xs px-2 py-0.5 rounded-full">
                            <CheckCircle className="w-3 h-3" /> Verificado
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">⭐ {proposal.professional.rating} · {proposal.createdAt}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{proposal.message}</p>
                  <div className="text-2xl font-bold text-success tabular-nums mb-3">
                    R$ {proposal.value.toFixed(2).replace(".", ",")}
                  </div>
                  {isLoggedIn && (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleAcceptProposal(proposal.value, proposal.professional.name)}>
                        Aceitar Proposta
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4" /> Chamar no Chat
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ModalOverlay>
  );
}
