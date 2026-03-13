import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/context/AppContext";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import LoginModal from "@/components/modals/LoginModal";
import CadastroModal from "@/components/modals/CadastroModal";
import RecuperarSenhaModal from "@/components/modals/RecuperarSenhaModal";
import CreatePostModal from "@/components/modals/CreatePostModal";
import EditProfileModal from "@/components/modals/EditProfileModal";
import ServiceDetailModal from "@/components/modals/ServiceDetailModal";
import AIPostBuilderModal from "@/components/modals/AIPostBuilderModal";
import CheckoutModal from "@/components/modals/CheckoutModal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mensagens" element={<Chat />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <LoginModal />
        <CadastroModal />
        <RecuperarSenhaModal />
        <CreatePostModal />
        <EditProfileModal />
        <ServiceDetailModal />
        <AIPostBuilderModal />
        <CheckoutModal />
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
