import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import ModalOverlay from "@/components/ModalOverlay";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, CheckCircle, Copy, CreditCard, QrCode, Wrench } from "lucide-react";

type PaymentStep = "summary" | "processing" | "success";

export default function CheckoutModal() {
  const { openModal, setOpenModal, checkoutData } = useApp();
  const [tab, setTab] = useState<"pix" | "cartao">("pix");
  const [step, setStep] = useState<PaymentStep>("summary");
  const [countdown, setCountdown] = useState(900);

  useEffect(() => {
    if (step !== "summary" || tab !== "pix") return;
    const timer = setInterval(() => setCountdown((c) => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [step, tab]);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const subtotal = checkoutData?.value || 150;
  const fee = subtotal * 0.05;
  const total = subtotal + fee;

  const handlePay = () => {
    setStep("processing");
    setTimeout(() => setStep("success"), 2000);
  };

  const handleClose = () => {
    setOpenModal(null);
    setStep("summary");
    setCountdown(900);
  };

  return (
    <ModalOverlay isOpen={openModal === "checkout"} onClose={handleClose} maxWidth="max-w-lg">
      <AnimatePresence mode="wait">
        {step === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-12 flex flex-col items-center justify-center min-h-[300px]"
          >
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-foreground font-medium">Processando seu pagamento...</p>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 flex flex-col items-center justify-center min-h-[300px] text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <CheckCircle className="w-20 h-20 text-success mb-4" />
            </motion.div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Pagamento realizado!</h2>
            <p className="text-sm text-muted-foreground mb-6">O profissional foi notificado.</p>
            <Button size="lg" onClick={handleClose}>⭐ Avaliar o Profissional</Button>
          </motion.div>
        )}

        {step === "summary" && (
          <motion.div key="summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-5">Pagamento</h2>

            <div className="bg-secondary rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="w-4 h-4 text-primary" />
                <span className="font-medium text-foreground text-sm">{checkoutData?.serviceTitle || "Conserto de Encanamento"}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Profissional: {checkoutData?.professionalName || "João Silva"}</p>
              <div className="space-y-1 text-sm tabular-nums">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">R$ {subtotal.toFixed(2).replace(".", ",")}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Taxa da plataforma</span><span className="text-foreground">R$ {fee.toFixed(2).replace(".", ",")}</span></div>
                <div className="border-t border-border pt-1 mt-1 flex justify-between font-bold"><span className="text-foreground">Total</span><span className="text-foreground">R$ {total.toFixed(2).replace(".", ",")}</span></div>
              </div>
            </div>

            <div className="flex gap-2 mb-5">
              <button onClick={() => setTab("pix")} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors ${tab === "pix" ? "bg-foreground text-card" : "bg-secondary text-foreground"}`}>
                <QrCode className="w-4 h-4" /> PIX
              </button>
              <button onClick={() => setTab("cartao")} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors ${tab === "cartao" ? "bg-foreground text-card" : "bg-secondary text-foreground"}`}>
                <CreditCard className="w-4 h-4" /> Cartão
              </button>
            </div>

            {tab === "pix" ? (
              <div className="text-center space-y-4">
                <div className="w-48 h-48 bg-secondary rounded-xl mx-auto flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-muted-foreground" />
                </div>
                <Button variant="outline" className="mx-auto">
                  <Copy className="w-4 h-4" /> Copiar Código Pix
                </Button>
                <p className="text-sm text-muted-foreground tabular-nums">O QR Code expira em {formatTime(countdown)}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Número do Cartão</label>
                  <input className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm tabular-nums" placeholder="0000 0000 0000 0000" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Nome no Cartão</label>
                  <input className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm" placeholder="Nome completo" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Validade</label>
                    <input className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm tabular-nums" placeholder="00/00" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">CVV</label>
                    <input className="w-full border border-border rounded-xl px-4 py-3 bg-card text-foreground text-sm tabular-nums" placeholder="000" />
                  </div>
                </div>
                <Button className="w-full" size="xl" onClick={handlePay}>
                  Pagar R$ {total.toFixed(2).replace(".", ",")}
                </Button>
              </div>
            )}

            <div className="flex items-center gap-1 justify-center mt-5 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" /> Pagamento 100% Seguro · SSL Certificado
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalOverlay>
  );
}
