"use client";

import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type AuthContextType = {
  linkBeforeLogin: string;
  setLinkBeforeLogin: (value: SetStateAction<string>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [linkBeforeLogin, setLinkBeforeLogin] = useState("/");

  const contextValue = {
    linkBeforeLogin,
    setLinkBeforeLogin,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
}
