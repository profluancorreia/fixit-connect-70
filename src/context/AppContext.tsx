import React, { createContext, useContext, useState, ReactNode } from "react";
import { User, Post, ModalType, FeedTab } from "@/types";
import { mockUser } from "@/data/mockData";

interface AppState {
  isLoggedIn: boolean;
  currentUser: User | null;
  activeFeed: FeedTab;
  openModal: ModalType;
  selectedPost: Post | null;
  checkoutData: { serviceTitle: string; professionalName: string; value: number } | null;
}

interface AppContextType extends AppState {
  setLoggedIn: (v: boolean) => void;
  setActiveFeed: (v: FeedTab) => void;
  setOpenModal: (v: ModalType) => void;
  setSelectedPost: (v: Post | null) => void;
  setCheckoutData: (v: AppState["checkoutData"]) => void;
  login: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeFeed, setActiveFeed] = useState<FeedTab>("pedidos");
  const [openModal, setOpenModal] = useState<ModalType>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [checkoutData, setCheckoutData] = useState<AppState["checkoutData"]>(null);

  const login = () => {
    setLoggedIn(true);
    setCurrentUser(mockUser);
    setOpenModal(null);
  };

  const logout = () => {
    setLoggedIn(false);
    setCurrentUser(null);
    setOpenModal(null);
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn, currentUser, activeFeed, openModal, selectedPost, checkoutData,
        setLoggedIn, setActiveFeed, setOpenModal, setSelectedPost, setCheckoutData,
        login, logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
