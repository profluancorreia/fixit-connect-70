export interface User {
  id: string;
  name: string;
  avatar: string;
  email?: string;
  bio?: string;
  phone?: string;
  address?: {
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
  isProfessional?: boolean;
  specialties?: string[];
  rating?: number;
  isVerified?: boolean;
}

export interface Post {
  id: string;
  type: "pedido" | "profissional";
  title: string;
  description: string;
  category: string;
  location: string;
  image: string;
  author: { name: string; avatar: string };
  isSponsored: boolean;
  commentsCount: number;
  createdAt: string;
}

export interface Proposal {
  id: string;
  professional: {
    name: string;
    avatar: string;
    isVerified: boolean;
    rating: number;
  };
  message: string;
  value: number;
  createdAt: string;
}

export interface ChatConversation {
  id: string;
  contact: { name: string; avatar: string };
  serviceTitle: string;
  lastMessage: string;
  unread: boolean;
  agreedValue?: number;
  status?: "negotiating" | "in_progress" | "completed";
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: string;
}

export type ModalType = "login" | "cadastro" | "createPost" | "editProfile" | "serviceDetail" | "aiBuilder" | "checkout" | "recuperarSenha" | "verificarEmail" | null;
export type FeedTab = "pedidos" | "profissionais";
